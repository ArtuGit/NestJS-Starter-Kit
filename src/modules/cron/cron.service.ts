import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'

import { RefreshTokenService } from '../auth/refreshToken.service'
import { WinstonLogger } from '../../config'

@Injectable()
export class CronService {
  constructor(
    private readonly logger: WinstonLogger,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  @Cron('0 3 * * 6')
  private async removeExpieredTokens() {
    try {
      await this.refreshTokenService.removeExpiered()
      this.logger.log('Expired tokens removed.')
    } catch (error) {
      this.logger.error(JSON.stringify(error))
    }
  }
}
