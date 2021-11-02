import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { IUser, IUserPublic } from '../interfaces/user.interface'

@Entity()
export class User implements IUser {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string

  @ApiProperty({ type: String })
  @Column()
  @Index({ unique: true })
  username: string

  @ApiProperty({ type: String })
  @Column()
  password: string
}

export class UserPublic implements IUserPublic {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string

  @ApiProperty({ type: String })
  @Column()
  @Index({ unique: true })
  username: string
}
