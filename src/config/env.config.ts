import { validate } from 'class-validator'
import { config } from 'dotenv'

import { EnvConfigDTO } from './dto/env.dto'
import { join } from 'path'
import * as path from 'path'

config()

export const envConfig = new EnvConfigDTO()

envConfig.PORT = parseInt(process.env.PORT || '')
envConfig.HOST = process.env.HOST || ''

envConfig.DB_HOST = process.env.DB_HOST || ''
envConfig.DB_PORT = parseInt(process.env.DB_PORT || '')
envConfig.DB_USERNAME = process.env.DB_USERNAME || ''
envConfig.DB_NAME = process.env.DB_NAME || ''
envConfig.DB_PASSWORD = process.env.DB_PASSWORD || ''

envConfig.JWT_SECRET = process.env.JWT_SECRET || ''
envConfig.JWT_EXPIRES_IN = parseInt(process.env.JWT_EXPIRES_IN || '')
envConfig.JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || ''
envConfig.JWT_REFRESH_EXPIRES_IN = parseInt(process.env.JWT_REFRESH_EXPIRES_IN || '')
envConfig.EMAIL_JWT_SECRET = process.env.EMAIL_JWT_SECRET || ''
envConfig.EMAIL_JWT_EXPIRES_IN = parseInt(process.env.EMAIL_JWT_EXPIRES_IN || '')
envConfig.EMAIL_ACTIVATION_EXPIRES_IN = parseInt(process.env.EMAIL_ACTIVATION_EXPIRES_IN || '')

envConfig.GATEWAY_API_HOST = process.env.GATEWAY_API_HOST || ''

envConfig.FRONTEND_HOST = process.env.FRONTEND_HOST || ''
envConfig.BACKEND_HOST = process.env.BACKEND_HOST || ''

envConfig.SENDGRID_FROM = process.env.SENDGRID_FROM || ''
envConfig.SENDGRID_FROM_NAME = process.env.SENDGRID_FROM_NAME || ''
envConfig.SENDGRID_API_KEY = process.env.SENDGRID_API_KEY || ''
envConfig.SENDGRID_CONFIRM_EMAIL_TEMPLATE_ID = process.env.SENDGRID_CONFIRM_EMAIL_TEMPLATE_ID || ''

envConfig.STRIPE_SECRET = process.env.STRIPE_SECRET || ''
envConfig.STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || ''
envConfig.STRIPE_DEFAULT_PRICE_ID = process.env.STRIPE_DEFAULT_PRICE_ID || ''
envConfig.STRIPE_COUPON_10 = process.env.STRIPE_COUPON_10 || ''
envConfig.STRIPE_COUPON_15 = process.env.STRIPE_COUPON_15 || ''
envConfig.STRIPE_COUPON_20 = process.env.STRIPE_COUPON_20 || ''
envConfig.STRIPE_COUPON_25 = process.env.STRIPE_COUPON_25 || ''

envConfig.NON_INSTANT_PURCHASES_DISCORD_WEBHOOK = process.env.NON_INSTANT_PURCHASES_DISCORD_WEBHOOK || null

envConfig.STATIC_PATH = process.env.STATIC_PATH || join(__dirname, '..', '..', 'static')

envConfig.GATEWAYS_LIST = process.env.GATEWAYS_LIST
  ? path.resolve(process.env.GATEWAYS_LIST)
  : path.resolve(__dirname, '..', '..', 'gateways.json')

envConfig.SERVICES_LIST = process.env.SERVICES_LIST
  ? path.resolve(process.env.SERVICES_LIST)
  : path.resolve(__dirname, '..', '..', 'services.json')

envConfig.ERROR_LOGGING_DISCORD_WEBHOOK = process.env.ERROR_LOGGING_DISCORD_WEBHOOK || ''

export const validateDotEnvConfig = async () => {
  const validationErrors = await validate(envConfig)

  if (validationErrors.length > 0) {
    console.error('Validation failed for environment variables:')
    validationErrors.forEach((error: any) => {
      console.error(`- ${error.property}: ${error.constraints}`)
    })
    throw new Error('Environment variable validation failed')
  }
}
