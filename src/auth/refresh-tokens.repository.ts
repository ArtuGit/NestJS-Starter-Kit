import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserPublic } from '../users/entities/user.entity'

import { RefreshToken } from './entities/refresh-token.entity'

@Injectable()
export class RefreshTokensRepository {
  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenOrm: Repository<RefreshToken>,
  ) {}

  public async createRefreshToken(user: UserPublic, ttl: number): Promise<RefreshToken> {
    const expiration = new Date()
    expiration.setTime(expiration.getTime() + ttl)

    const token: RefreshToken = {
      ...new RefreshToken(),
      userId: user.id,
      isRevoked: false,
      expires: expiration,
    }

    return this.refreshTokenOrm.save(token)
  }

  public async findTokenById(id: string): Promise<RefreshToken> {
    return this.refreshTokenOrm.findOne(id)
  }
}
