import { ApiProperty } from '@nestjs/swagger'

import { User } from '../../users/entities/user.entity'

class AuthenticatedPayload {
  type: string

  token: string

  refresh_token?: string
}

export class AuthenticatedResponse {
  @ApiProperty({ type: User })
  user: User

  @ApiProperty({ type: AuthenticatedPayload })
  payload: AuthenticatedPayload
}
