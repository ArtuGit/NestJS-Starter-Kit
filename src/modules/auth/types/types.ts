import { RolesEnum } from '../../../shared'

export type TokenPayloadType = {
  id: string
  role: RolesEnum
  session: string
  iat: Date
  exp: Date
}

export type AuthenticatedRequestType = Request & {
  user: TokenPayloadType
}
