import { ApiProperty } from '@nestjs/swagger'

export class LoginResponse {
  @ApiProperty({ type: String })
  access_token: string
}
