import { hash, hashSync } from 'bcrypt'

import { IUser } from '../interfaces/user.interface'

export const usersStorage: IUser[] = [
  {
    id: '1',
    username: 'john',
    password: hashSync('changeme', 10),
  },
  {
    id: '2',
    username: 'chris',
    password: hashSync('secret', 10),
  },
  {
    id: '3',
    username: 'maria',
    password: hashSync('guess', 10),
  },
]
