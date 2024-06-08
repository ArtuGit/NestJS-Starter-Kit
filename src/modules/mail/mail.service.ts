// import { MailerService } from '@nestjs-modules/mailer';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { I18nContext, I18nService } from 'nestjs-i18n';
// import { MailData } from './interfaces/mail-data.interface';
//
// @Injectable()
// export class MailService {
//   constructor(
//     private mailerService: MailerService,
//   ) {}
//
//   async sendConfirmationEmailMessage(mailData: MailData<{ hash: string }>, lang) {
//
//     await this.mailerService.sendMail({
//       to: mailData.to,
//       subject: 'Confirm Email'
//       text: '`,
//       template: 'activation',
//       context: {
//         title: await i18n.t('common.confirmEmail'),
//         url: `${this.configService.get('app.frontendDomain')}/confirm-email/${
//           mailData.data.hash
//         }`,
//         actionTitle: await i18n.t('common.confirmEmail'),
//         app_name: this.configService.get('app.name'),
//         text1: await i18n.t('confirm-email.text1'),
//         text2: await i18n.t('confirm-email.text2'),
//         text3: await i18n.t('confirm-email.text3'),
//       },
//     });
//   }
// }
