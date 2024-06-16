import { ForbiddenException, Inject, Injectable, UnauthorizedException, forwardRef, Logger } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UsersService } from '../users/users.service'
import { User } from '../users/users.entity'
import { LoginDTO, LoginReturnDTO } from './dto'
import { envConfig } from '../../config'
import { RefreshTokenService } from './refreshToken.service'
import { ReturnMessage } from '../../utils'
import { RolesEnum } from '../../shared'
import { TokenPayloadType } from './types/types'

@Injectable()
export class AuthService {
  private readonly logger: Logger = new Logger(AuthService.name)

  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly jwtService: JwtService,
  ) {}

  public async validateUser({ email, password }: LoginDTO): Promise<User | null> {
    const user = await this.usersService.findUserByEmail(email.toLowerCase())
    const passwordValid = await user.checkPassword(password)

    if (!passwordValid) {
      this.logger.error(`The user with ${email} entered the wrong password`)
      return null
    }

    return user
  }

  public async login(user: { id: string }): Promise<LoginReturnDTO> {
    return await this.getTokens(user.id)
  }

  public async logout(refreshTokenId: string): Promise<ReturnMessage> {
    const token = await this.refreshTokenService.findById(refreshTokenId)

    if (token) await this.refreshTokenService.remove(token)

    return { message: 'OK' }
  }

  public async refreshToken(userId: string, refreshToken: string): Promise<LoginReturnDTO> {
    const token = await this.refreshTokenService.findOne(refreshToken, userId)

    try {
      const result = await this.jwtService.verifyAsync(refreshToken, {
        secret: envConfig.JWT_REFRESH_SECRET,
      })
      if (!token || !result) throw new ForbiddenException('Access Denied')
    } catch (error: any & { message: string }) {
      if (token) await this.refreshTokenService.remove(token)
      this.logger.error(JSON.stringify(error))
      throw new ForbiddenException(error.message)
    }

    const tokens = await this.getTokens(userId)
    await this.refreshTokenService.remove(token)

    return tokens
  }

  public async getTokens(userId: string): Promise<LoginReturnDTO> {
    const tokens: LoginReturnDTO = {
      accessToken: '',
      refreshToken: '',
    }

    tokens.refreshToken = await this.getRefreshToken(userId)

    const savedRefreshToken = await this.refreshTokenService.create(tokens.refreshToken, userId)

    const user = await this.usersService.findUserByID(userId)

    tokens.accessToken = await this.getAccessToken(userId, user.role, savedRefreshToken.id)

    return tokens
  }

  private async getAccessToken(userId: string, role: RolesEnum, refreshTokenId: string): Promise<string> {
    const accessToken = await this.jwtService.signAsync({
      id: userId,
      role,
      session: refreshTokenId,
    })

    return accessToken
  }

  private async getRefreshToken(userId: string): Promise<string> {
    const refreshToken = await this.jwtService.signAsync(
      { id: userId },
      {
        secret: envConfig.JWT_REFRESH_SECRET,
        expiresIn: envConfig.JWT_REFRESH_EXPIRES_IN,
      },
    )

    return refreshToken
  }

  public async checkAuthReturnUserDataOrFalse(client: any): Promise<boolean | TokenPayloadType> {
    const token = this.extractTokenFromHeader(client)
    const error = () => {
      client.emit('error', 'Bearer token is Invalid')
      client.disconnect()
      this.logger.error('Webhook authentication failed')
      return false
    }

    if (!token) return error()

    try {
      return (await this.jwtService.verifyAsync(token, {
        secret: envConfig.JWT_SECRET,
      })) as TokenPayloadType
    } catch {
      return error()
    }
  }

  public extractTokenFromHeader(client: any): string | undefined {
    const [type, token] = client.handshake.headers.authorization?.split(' ') ?? []
    return type === 'Bearer' ? token : undefined
  }
}
