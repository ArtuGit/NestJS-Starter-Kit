import { ApiProperty } from '@nestjs/swagger'

export class LoginReturnDTO {
  @ApiProperty()
  accessToken: string

  @ApiProperty()
  refreshToken: string
}
