import { plainToClass } from 'class-transformer'
import { IsEnum, IsNotEmpty, IsNumber, IsString, validateSync } from 'class-validator'

enum Environment {
  Development = 'development',
  Production = 'production',
  Test = 'test',
  Provision = 'provision',
}

class EnvironmentVariables {
  // @IsEnum(Environment)
  // NODE_ENV: Environment;

  @IsNumber()
  readonly PORT: number = 3000

  @IsString()
  readonly COMMON_VAR: string

  @IsString()
  @IsNotEmpty()
  readonly JWT_SECRET: string

  @IsNumber()
  @IsNotEmpty()
  readonly JWT_ACCESS_TOKEN_DURATION_IN_MINUTES: number

  @IsNumber()
  @IsNotEmpty()
  readonly JWT_REFRESH_TOKEN_DURATION_IN_MINUTES: number

  @IsString()
  @IsNotEmpty()
  readonly UPLOAD_DIR: string
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, { enableImplicitConversion: true })
  const errors = validateSync(validatedConfig, { skipMissingProperties: false })

  if (errors.length > 0) {
    throw new Error(errors.toString())
  }
  return validatedConfig
}
