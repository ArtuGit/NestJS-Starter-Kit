import { IsString, IsInt, IsNotEmpty, IsEmail, IsOptional } from 'class-validator'

export class EnvConfigDTO {
  @IsInt()
  @IsNotEmpty()
  PORT: number

  @IsString()
  @IsNotEmpty()
  HOST: string

  @IsString()
  @IsNotEmpty()
  DB_HOST: string

  @IsInt()
  @IsNotEmpty()
  DB_PORT: number

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string

  @IsString()
  @IsNotEmpty()
  DB_NAME: string

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string

  @IsString()
  @IsNotEmpty()
  JWT_SECRET: string

  @IsInt()
  @IsNotEmpty()
  JWT_EXPIRES_IN: number

  @IsString()
  @IsNotEmpty()
  JWT_REFRESH_SECRET: string

  @IsInt()
  @IsNotEmpty()
  JWT_REFRESH_EXPIRES_IN: number

  @IsString()
  @IsNotEmpty()
  EMAIL_JWT_SECRET: string

  @IsInt()
  @IsNotEmpty()
  EMAIL_JWT_EXPIRES_IN: number

  @IsInt()
  @IsNotEmpty()
  EMAIL_ACTIVATION_EXPIRES_IN: number

  @IsString()
  @IsNotEmpty()
  GATEWAY_API_HOST: string

  @IsString()
  @IsNotEmpty()
  FRONTEND_HOST: string

  @IsString()
  @IsNotEmpty()
  BACKEND_HOST: string

  @IsEmail()
  SENDGRID_FROM: string

  @IsString()
  @IsNotEmpty()
  SENDGRID_FROM_NAME: string

  @IsString()
  @IsNotEmpty()
  SENDGRID_API_KEY: string

  @IsString()
  @IsNotEmpty()
  SENDGRID_CONFIRM_EMAIL_TEMPLATE_ID: string

  @IsString()
  @IsNotEmpty()
  STRIPE_SECRET: string

  @IsString()
  @IsNotEmpty()
  STRIPE_WEBHOOK_SECRET: string

  @IsString()
  @IsNotEmpty()
  STRIPE_DEFAULT_PRICE_ID: string

  @IsString()
  STRIPE_COUPON_10: string

  @IsString()
  STRIPE_COUPON_15: string

  @IsString()
  STRIPE_COUPON_20: string

  @IsString()
  STRIPE_COUPON_25: string

  @IsString()
  @IsOptional()
  NON_INSTANT_PURCHASES_DISCORD_WEBHOOK: string | null

  @IsString()
  STATIC_PATH: string

  @IsString()
  GATEWAYS_LIST: string

  @IsString()
  SERVICES_LIST: string

  @IsString()
  @IsOptional()
  ERROR_LOGGING_DISCORD_WEBHOOK: string
}
