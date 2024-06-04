import { Module } from '@nestjs/common'

import { CronService } from './cron.service'
import { AuthModule } from '../auth/auth.module'
import { WinstonLogger } from '../../config'

@Module({
  imports: [AuthModule],
  providers: [CronService, WinstonLogger],
})
export class CronModule {}
