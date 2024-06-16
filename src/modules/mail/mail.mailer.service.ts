import { MailerService } from '@nestjs-modules/mailer'
import { Injectable, Logger } from '@nestjs/common'
import { IConfirmationEmailMessage } from '../../shared'
import { MailService } from './mail.service'
import { IMailData } from './types/mail-data-interface'

@Injectable()
export class MailMailerService implements MailService {
  private readonly logger: Logger = new Logger(MailMailerService.name)

  constructor(private mailerService: MailerService) {}

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
