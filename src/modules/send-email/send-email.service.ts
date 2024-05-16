import { SendGridService } from '@anchan828/nest-sendgrid'
import { Injectable } from '@nestjs/common'

import { WinstonLogger, envConfig } from '../../config'

@Injectable()
export class SendEmailService {
  constructor(
    private readonly sendGrid: SendGridService,
    private readonly logger: WinstonLogger,
  ) {}

  public async sendConfirmationEmailMessage(toEmail: string, data: any): Promise<boolean> {
    try {
      const response = await this.sendGrid.send({
        to: toEmail,
        from: {
          name: envConfig.SENDGRID_FROM_NAME,
          email: envConfig.SENDGRID_FROM,
        },
        templateId: envConfig.SENDGRID_CONFIRM_EMAIL_TEMPLATE_ID,
        dynamicTemplateData: data,
      })

      if (response[0].statusCode >= 200 && response[0].statusCode <= 202) {
        return true
      }

      return false
    } catch (error) {
      this.logger.error(JSON.stringify(error))
      throw new Error('Error sending email')
    }
  }

  public async sendTeamInviteEmail(toEmail: string, data: any) {
    try {
      const response = await this.sendGrid.send({
        to: toEmail,
        from: {
          name: envConfig.SENDGRID_FROM_NAME,
          email: envConfig.SENDGRID_FROM,
        },
        templateId: 'd-6f595e9f204f4b7a887b85bf7938d316',
        dynamicTemplateData: data,
      })

      if (response[0].statusCode >= 200 && response[0].statusCode <= 202) {
        return true
      }

      return false
    } catch (error) {
      this.logger.error(JSON.stringify(error))
      throw new Error('Error sending email')
    }
  }

  public async sendPurchaseConfirmationEmail(toEmail: string, data: any) {
    try {
      const response = await this.sendGrid.send({
        to: toEmail,
        from: {
          name: envConfig.SENDGRID_FROM_NAME,
          email: envConfig.SENDGRID_FROM,
        },
        templateId: 'd-eec1aa647dbd4229a13d330fd86de312',
        dynamicTemplateData: data,
      })

      if (response[0].statusCode >= 200 && response[0].statusCode <= 202) {
        return true
      }

      return false
    } catch (error) {
      this.logger.error(JSON.stringify(error))
      throw new Error('Error sending email')
    }
  }
}
