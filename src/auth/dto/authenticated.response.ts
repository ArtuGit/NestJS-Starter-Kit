import { ApiProperty } from '@nestjs/swagger'

import { User, UserPublic } from '../../users/entities/user.entity'

class AuthenticatedPayload {
  type: string

  token: string

  refresh_token?: string
}

export class AuthenticatedResponse {
  @ApiProperty({ type: UserPublic })
  user: UserPublic

  @ApiProperty({ type: AuthenticatedPayload })
  payload: AuthenticatedPayload
}
