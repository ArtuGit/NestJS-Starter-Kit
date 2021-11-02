export interface IUser {
  id: string
  username: string
  email: string
  password: string
}
export type IUserPublic = Omit<IUser, 'password'>

export type IUserInJwt = Omit<IUserPublic, 'email'>

export type IUserPublicPartial = Partial<IUserPublic>
