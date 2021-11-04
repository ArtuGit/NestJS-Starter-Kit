import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { SignOptions, TokenExpiredError } from 'jsonwebtoken'

import { User, UserPublic } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'

import { RefreshTokenPayload, RefreshTokenResult } from './interfaces/tokens-interfaces'
import { RefreshTokensRepository } from './refresh-tokens.repository'
import { RefreshToken } from './entities/refresh-token.entity'

@Injectable()
export class TokensService {
  constructor(
    private readonly refreshTokensRepository: RefreshTokensRepository,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async generateAccessToken(user: UserPublic, refreshTokenId: string): Promise<string> {
    const opts: SignOptions = {
      subject: String(user.id),
    }

    return this.jwtService.signAsync({ refreshTokenId }, opts)
  }

  async generateRefreshToken(user: UserPublic, expiresIn: number): Promise<RefreshTokenResult> {
    const token = await this.refreshTokensRepository.createRefreshToken(
      user,
      expiresIn * 60 * 1000, //minutes to milliseconds
    )

    const opts: SignOptions = {
      expiresIn,
      subject: String(user.id),
      jwtid: String(token.id),
    }

    return {
      id: token.id,
      token: await this.jwtService.signAsync({}, opts),
    }
  }

  async resolveRefreshToken(encoded: string): Promise<{ user: User; token: RefreshToken }> {
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

  async createAccessTokenFromRefreshToken(refresh: string): Promise<{ token: string; user: User }> {
    const { user, token } = await this.resolveRefreshToken(refresh)
    const tokenAccess = await this.generateAccessToken(user, token.id)
    return { user, token: tokenAccess }
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

    return this.usersService.findOneByPayload({ id: subId })
  }

  private async getStoredTokenFromRefreshTokenPayload(payload: RefreshTokenPayload): Promise<RefreshToken | null> {
    const tokenId = payload.jti

    if (!tokenId) {
      throw new UnprocessableEntityException('Refresh token malformed')
    }

    return this.refreshTokensRepository.findTokenById(tokenId)
  }

  async revokeAccessToken(jwt: string): Promise<void> {
    const tokenDecoded = this.jwtService.decode(jwt, { json: true }) as { refreshTokenId: string }
    const updRes = await this.refreshTokensRepository.updateTokenById(tokenDecoded.refreshTokenId, { isRevoked: true })
    if (updRes.affected === 0) {
      throw new NotFoundException(`Refresh token (id=${tokenDecoded.refreshTokenId}) does not exist`)
    }
  }
}
