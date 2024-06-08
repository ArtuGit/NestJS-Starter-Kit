import * as path from 'path'
import { Injectable } from '@nestjs/common'
import { MailerOptions, MailerOptionsFactory } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { appConfig } from './app.config.'
import { envConfig } from './env.config'

@Injectable()
export class MailConfigService implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: envConfig.MAIL_HOST,
        port: envConfig.MAIL_PORT,
        ignoreTLS: envConfig.MAIL_IGNORE_TLS,
        secure: envConfig.MAIL_SECURE,
        requireTLS: envConfig.MAIL_REQUIRE_TLS,
        auth: {
          user: envConfig.MAIL_USER,
          pass: envConfig.MAIL_PASSWORD,
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
      defaults: {
        from: `"${envConfig.MAIL_DEFAULT_NAME}" <${envConfig.MAIL_DEFAULT_EMAIL}>`,
      },
      template: {
        dir: path.join(appConfig.workingDirectory, 'src', 'modules', 'mail', 'templates'),
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    } as MailerOptions
  }
}
