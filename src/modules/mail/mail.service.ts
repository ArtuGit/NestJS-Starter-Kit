import { Injectable } from '@nestjs/common'
import { IConfirmationEmailMessage } from '../../shared'
import { IMailData } from './types/mail-data-interface'

@Injectable()
export abstract class MailService {
  abstract sendConfirmationEmailMessage(mailData: IMailData<IConfirmationEmailMessage>): Promise<boolean>
}
