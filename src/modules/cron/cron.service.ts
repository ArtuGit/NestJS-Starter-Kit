import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

import { RefreshTokenService } from '../auth/refreshToken.service'

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name)

  constructor(private readonly refreshTokenService: RefreshTokenService) {}

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
