import { Role } from '../../../common/roles/role.enum'

export interface IUser {
  id: string
  username: string
  email: string
  roles: Role[]
  password: string
}
export type IUserPublic = Omit<IUser, 'roles' | 'password'>

export type IUserInJwt = Omit<IUserPublic, 'email'>

export type IUserPublicPartial = Partial<IUserPublic>
