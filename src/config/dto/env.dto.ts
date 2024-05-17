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
}
