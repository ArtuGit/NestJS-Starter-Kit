import { ApiProperty } from '@nestjs/swagger'

import { User, UserPublic } from '../../../entities/user.entity'

class AuthenticatedPayload {
  @ApiProperty({ type: String })
  type: string

  @ApiProperty({ type: String })
  token: string

  @ApiProperty({ type: String })
  refresh_token?: string
}

export class AuthenticatedResponse {
  @ApiProperty({ type: UserPublic })
  user: UserPublic

  @ApiProperty({ type: AuthenticatedPayload })
  payload: AuthenticatedPayload
}
