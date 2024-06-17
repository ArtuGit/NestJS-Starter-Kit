import { SendGridModule } from '@anchan828/nest-sendgrid'
import { Module } from '@nestjs/common'
import { envConfig } from '../../config'
import { MailMailerService } from './mail.mailer.service'
import { MailService } from './mail.service'

@Module({
  imports: [
    // Remove if SendGrid is not used
    SendGridModule.forRoot({
      apikey: envConfig.SENDGRID_API_KEY,
    }),
  ],
  providers: [
    {
      provide: MailService,
      // Change useClass to MailSendgridService if SendGrid is used
      useClass: MailMailerService,
    },
  ],
  exports: [MailService],
})
export class MailModule {}
