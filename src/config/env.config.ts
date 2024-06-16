import { validate } from 'class-validator'
import { config } from 'dotenv'

import { EnvConfigDTO } from './dto/env.dto'
import { join } from 'path'

config()

export const envConfig = new EnvConfigDTO()

envConfig.NODE_ENV = process.env.NODE_ENV ?? 'local'

envConfig.PORT = parseInt(process.env.PORT ?? '')
envConfig.HOST = process.env.HOST ?? '3000'

envConfig.APP_HEADER_LANGUAGE = process.env.APP_HEADER_LANGUAGE ?? 'x-custom-lang'
envConfig.APP_FALLBACK_LANGUAGE = process.env.APP_FALLBACK_LANGUAGE ?? 'en'

envConfig.LOGGING_LEVEL =
  (process.env.LOGGING_LEVEL as 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly') ?? 'debug'
envConfig.LOGGING_FILE_LOG = process.env.LOGGING_FILE_LOG === 'true'
envConfig.LOGGING_FILE_NAME = process.env.LOGGING_FILE_NAME ?? 'app.log'

envConfig.DB_HOST = process.env.DB_HOST ?? ''
envConfig.DB_PORT = parseInt(process.env.DB_PORT ?? '')
envConfig.DB_USERNAME = process.env.DB_USERNAME ?? ''
envConfig.DB_NAME = process.env.DB_NAME ?? ''
envConfig.DB_PASSWORD = process.env.DB_PASSWORD ?? ''

envConfig.JWT_SECRET = process.env.JWT_SECRET ?? ''
envConfig.JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN ?? '')
envConfig.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET ?? ''
envConfig.JWT_REFRESH_EXPIRES_IN = parseInt(process.env.JWT_REFRESH_EXPIRES_IN ?? '')

envConfig.EMAIL_JWT_SECRET = process.env.EMAIL_JWT_SECRET ?? ''
envConfig.EMAIL_JWT_EXPIRES_IN = parseInt(process.env.EMAIL_JWT_EXPIRES_IN ?? '')
envConfig.EMAIL_ACTIVATION_EXPIRES_IN = parseInt(process.env.EMAIL_ACTIVATION_EXPIRES_IN ?? '')

envConfig.FRONTEND_HOST = process.env.FRONTEND_HOST ?? ''

envConfig.SENDGRID_FROM = process.env.SENDGRID_FROM ?? ''
envConfig.SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME ?? ''
envConfig.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY ?? ''
envConfig.SENDGRID_CONFIRM_EMAIL_TEMPLATE_ID = process.env.SENDGRID_CONFIRM_EMAIL_TEMPLATE_ID ?? ''

envConfig.MAIL_HOST = process.env.MAIL_HOST ?? ''
envConfig.MAIL_PORT = parseInt(process.env.MAIL_PORT ?? '')
envConfig.MAIL_USER = process.env.MAIL_USER ?? ''
envConfig.MAIL_PASSWORD = process.env.MAIL_PASSWORD ?? ''
envConfig.MAIL_DEFAULT_EMAIL = process.env.MAIL_DEFAULT_EMAIL ?? ''
envConfig.MAIL_DEFAULT_NAME = process.env.MAIL_DEFAULT_NAME ?? ''
envConfig.MAIL_IGNORE_TLS = process.env.MAIL_IGNORE_TLS === 'true'
envConfig.MAIL_SECURE = process.env.MAIL_SECURE === 'true'
envConfig.MAIL_REQUIRE_TLS = process.env.MAIL_REQUIRE_TLS === 'true'

envConfig.STATIC_PATH = join(__dirname, '..', 'static')

export const validateDotEnvConfig = async () => {
  const validationErrors = await validate(envConfig)

  if (validationErrors.length > 0) {
    // eslint-disable-next-line no-console
    console.error('Validation failed for environment variables:')
    validationErrors.forEach((error: any) => {
      // eslint-disable-next-line no-console
      console.error(`- ${error.property}: ${error.constraints}`)
    })
    throw new Error('Environment variable validation failed')
  }
}
