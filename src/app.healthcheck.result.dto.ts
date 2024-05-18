import { ApiProperty } from '@nestjs/swagger'

export class AppHealthcheckResultDto {
  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ type: String })
  version: string

  @ApiProperty({ type: String })
  healthy: boolean
}
