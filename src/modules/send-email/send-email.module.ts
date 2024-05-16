import { Module } from '@nestjs/common'
import { SendGridModule } from '@anchan828/nest-sendgrid'

import { SendEmailService } from './send-email.service'
import { WinstonLogger, envConfig } from '../../config'

@Module({
  imports: [
    SendGridModule.forRoot({
      apikey: envConfig.SENDGRID_API_KEY,
    }),
  ],
  providers: [SendEmailService, WinstonLogger],
  exports: [SendEmailService],
})
export class SendEmailModule {}
