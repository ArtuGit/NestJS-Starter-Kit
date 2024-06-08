import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { IConfirmationEmailMessage } from '../../shared'
import { IMailData } from './types/mail-data-interface';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
  ) {}

  async sendConfirmationEmailMessage(mailData: IMailData<IConfirmationEmailMessage>) {

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: 'Confirm Email',
      text: `${mailData.data.OperationText} ${mailData.data.ConfirmationLink}`,
      template: 'confirmation',
      context: {
        ...mailData.data,
      },
    });
  }
}
