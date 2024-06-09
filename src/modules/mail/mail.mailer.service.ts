import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { WinstonLogger } from '../../config'
import { IConfirmationEmailMessage } from '../../shared'
import { MailService } from './mail.service'
import { IMailData } from './types/mail-data-interface'

@Injectable()
export class MailMailerService implements MailService {
  constructor(
    private mailerService: MailerService,
    private readonly logger: WinstonLogger,
  ) {}

  async sendConfirmationEmailMessage(mailData: IMailData<IConfirmationEmailMessage>): Promise<boolean> {
    try {
      await this.mailerService.sendMail({
        to: mailData.to,
        subject: 'Confirm Email',
        text: `${mailData.data.OperationText} ${mailData.data.ConfirmationLink}`,
        template: 'confirmation',
        context: {
          ...mailData.data,
        },
      })
      return true
    } catch (error) {
      this.logger.error(JSON.stringify(error))
      throw new Error('Error sending email')
    }
  }
}
