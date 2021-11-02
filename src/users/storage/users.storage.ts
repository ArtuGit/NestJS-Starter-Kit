import { hash, hashSync } from 'bcrypt'

import { IUser } from '../interfaces/user.interface'

export const usersStorage: IUser[] = [
  {
    id: '1',
    username: 'john',
    email: 'john@email.com',
    password: hashSync('changeme', 10),
  },
  {
    id: '2',
    username: 'chris',
    email: 'chris@email.com',
    password: hashSync('secret', 10),
  },
  {
    id: '3',
    username: 'maria',
    email: 'maria@email.com',
    password: hashSync('guess', 10),
  },
]
