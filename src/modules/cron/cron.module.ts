import { Module } from '@nestjs/common'

import { CronService } from './cron.service'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [AuthModule],
  providers: [CronService],
})
export class CronModule {}
