import { RolesEnum } from '../../users/enums'

export type TokenPayloadType = {
  id: string
  role: RolesEnum
  session: string
  teamId: string
  subscriptionExpired: boolean
  iat: Date
  exp: Date
}

export type AuthenticatedRequestType = Request & {
  user: TokenPayloadType
}
