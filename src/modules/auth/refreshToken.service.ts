import { Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { LessThan, Repository } from 'typeorm'
import * as moment from 'moment'

import { envConfig } from '../../config'
import { RefreshToken } from './refreshToken.entity'

@Injectable()
export class RefreshTokenService {
  private readonly logger: Logger = new Logger(RefreshTokenService.name)

  constructor(
    @InjectRepository(RefreshToken)
    private readonly refreshTokenRepository: Repository<RefreshToken>,
  ) {}

  public async create(refreshToken: string, userId: string): Promise<RefreshToken> {
    try {
      return await this.refreshTokenRepository
        .create({
          token: refreshToken,
          userId,
          expiresAt: moment().add(envConfig.JWT_REFRESH_EXPIRES_IN, 's').toDate(),
        })
        .save()
    } catch (error) {
      this.logger.error(JSON.stringify(error))
      throw new Error('Login error')
    }
  }

  public async findById(id: string): Promise<RefreshToken | null> {
    return await this.refreshTokenRepository.findOne({
      where: {
        id,
      },
    })
  }

  public async findOne(refreshToken: string, userId: string): Promise<RefreshToken | null> {
    return await this.refreshTokenRepository.findOne({
      where: {
        token: refreshToken,
        userId,
      },
    })
  }

  public async remove(token: RefreshToken): Promise<RefreshToken> {
    return await token.remove()
  }

  public async removeExpiered(): Promise<void> {
    const tokens = await this.refreshTokenRepository.find({
      where: {
        expiresAt: LessThan(moment().toDate()),
      },
    })

    await this.refreshTokenRepository.remove(tokens)
  }
}
