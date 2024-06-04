import { ApiProperty } from '@nestjs/swagger'
import { HealthCheckResult } from '@nestjs/terminus'
import { Type } from 'class-transformer'
import { Allow } from 'class-validator'

export class AppHealthCheckResponseDto {
  @ApiProperty()
  readonly name: string

  @ApiProperty()
  readonly version: string

  @Allow()
  @Type(() => Object)
  readonly health: HealthCheckResult
}
