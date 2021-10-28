import { Injectable } from '@nestjs/common'

import { User } from '../users/entities/user'
import { usersStorage } from '../users/storage/users.storage'

import { RefreshToken } from './entities/refresh-token.entity'

@Injectable()
export class RefreshTokensRepository {
  private refreshTokens: RefreshToken[]

  constructor() {
    this.refreshTokens = []
  }

  public async createRefreshToken(user: User, ttl: number): Promise<RefreshToken> {
    const id = Math.floor(10000000 + Math.random() * 90000000).toString()
    const expiration = new Date()
    expiration.setTime(expiration.getTime() + ttl)

    const token: RefreshToken = {
      id,
      userId: user.id,
      isRevoked: false,
      expires: expiration,
    }

    this.refreshTokens.push(token)
    return token
  }

  public async findTokenById(id: string): Promise<RefreshToken | null> {
    const exTokenInd: number = this.refreshTokens.findIndex((el) => el.id === id)
    if (exTokenInd === -1) {
      return null
    }
    return this.refreshTokens[exTokenInd]
  }
}
