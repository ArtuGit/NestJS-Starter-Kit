import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignOptions, TokenExpiredError } from 'jsonwebtoken'

import { User, UserPublic } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { RefreshTokenPayload } from '../interfaces/tokens-interfaces'

import { RefreshTokensRepository } from './refresh-tokens.repository'
import { RefreshToken } from './entities/refresh-token.entity'

@Injectable()
export class TokensService {
  public constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async generateAccessToken(user: UserPublic): Promise<string> {
    const opts: SignOptions = {
      subject: String(user.id),
    }

    return this.jwtService.signAsync({}, opts)
  }

  public async generateRefreshToken(user: UserPublic, expiresIn: number): Promise<string> {
    const token = await this.refreshTokensRepository.createRefreshToken(user, expiresIn)

    const opts: SignOptions = {
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id),
    }

    return this.jwtService.signAsync({}, opts)
  }

  public async resolveRefreshToken(encoded: string): Promise<{ user: User; token: RefreshToken }> {
    const payload = await this.decodeRefreshToken(encoded)
    const token = await this.getStoredTokenFromRefreshTokenPayload(payload)

    if (!token) {
      throw new UnprocessableEntityException('Refresh token not found')
    }

    if (token.isRevoked) {
      throw new UnprocessableEntityException('Refresh token revoked')
    }

    const user = await this.getUserFromRefreshTokenPayload(payload)

    if (!user) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }

    return { user, token }
  }

  public async createAccessTokenFromRefreshToken(refresh: string): Promise<{ token: string; user: User }> {
    const { user } = await this.resolveRefreshToken(refresh)
    const token = await this.generateAccessToken(user)
    return { user, token }
  }

  private async decodeRefreshToken(tokenRefresh: string): Promise<RefreshTokenPayload> {
    try {
      const token = this.jwtService.verify(tokenRefresh)
      return token
    } catch (e) {
      if (e instanceof TokenExpiredError) {
        throw new UnprocessableEntityException('Refresh token expired')
      } else {
        throw new UnprocessableEntityException('Refresh token malformed')
      }
    }
  }

  private async getUserFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<User> {
    const subId = payload.sub

    if (!subId) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }

    return this.usersService.findOneById(subId)
  }

  private async getStoredTokenFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<RefreshToken | null> {
    const tokenId = payload.jti

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }

    return this.refreshTokensRepository.findTokenById(tokenId)
  }
}
