import { ApiProperty } from '@nestjs/swagger'
import { HealthCheckResult } from '@nestjs/terminus'
import { Type } from 'class-transformer'
import { Allow, IsString } from 'class-validator'

export class AppHealthCheckResponseDto {
  @ApiProperty()
  @IsString()
  readonly name: string

  @ApiProperty()
  @IsString()
  readonly version: string

  @Allow()
  @Type(() => Object)
  readonly health: HealthCheckResult
}
