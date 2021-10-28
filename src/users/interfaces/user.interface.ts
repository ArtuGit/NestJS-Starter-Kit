export interface IUser {
  id: string
  username: string
  password: string
}
export type IUserPublic = Omit<IUser, 'password'>
