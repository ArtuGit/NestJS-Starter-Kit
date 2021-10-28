import { ApiProperty } from '@nestjs/swagger'

import { IUser } from '../interfaces/user.interface'

export class User implements Omit<IUser, 'password'> {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: String })
  username: string
}
