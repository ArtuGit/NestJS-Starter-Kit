import { Type } from 'class-transformer'
import { IsString, IsInt, IsNotEmpty, IsEmail, IsBoolean } from 'class-validator'

export class EnvConfigDTO {
  @IsString()
  @IsNotEmpty()
  NODE_ENV: string

  @IsInt()
  @IsNotEmpty()
  PORT: number

  @IsString()
  @IsNotEmpty()
  HOST: string

  @IsString()
  @IsNotEmpty()
  APP_HEADER_LANGUAGE: string

  @IsString()
  @IsNotEmpty()
  APP_FALLBACK_LANGUAGE: string

  @IsString()
  @Type(() => String)
  LOGGING_LEVEL!: 'error' | 'warn' | 'info' | 'http' | 'verbose' | 'debug' | 'silly'

  @IsBoolean()
  @IsNotEmpty()
  LOGGING_FILE_LOG: boolean

  @IsString()
  @IsNotEmpty()
  LOGGING_FILE_NAME: string

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
  FRONTEND_HOST: string

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
  STATIC_PATH: string

  @IsString()
  @IsNotEmpty()
  MAIL_HOST: string

  @IsInt()
  @IsNotEmpty()
  MAIL_PORT: number

  @IsString()
  @IsNotEmpty()
  MAIL_USER: string

  @IsString()
  @IsNotEmpty()
  MAIL_PASSWORD: string

  @IsEmail()
  @IsNotEmpty()
  MAIL_DEFAULT_EMAIL: string

  @IsString()
  @IsNotEmpty()
  MAIL_DEFAULT_NAME: string

  @IsBoolean()
  @IsNotEmpty()
  MAIL_IGNORE_TLS: boolean

  @IsBoolean()
  @IsNotEmpty()
  MAIL_SECURE: boolean

  @IsBoolean()
  @IsNotEmpty()
  MAIL_REQUIRE_TLS: boolean

  @IsString()
  @IsNotEmpty()
  ADMIN_EMAIL: string

  @IsString()
  @IsNotEmpty()
  ADMIN_PASSWORD: string
}
