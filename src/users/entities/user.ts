import { ApiProperty } from '@nestjs/swagger'

import { IUser } from '../interfaces/user.interface'
import { Column, Index, PrimaryGeneratedColumn } from 'typeorm'

export class User implements Omit<IUser, 'password'> {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string

  @ApiProperty({ type: String })
  @Column()
  @Index({ unique: true })
  username: string
}
