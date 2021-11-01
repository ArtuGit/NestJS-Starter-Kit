import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { IUser } from '../interfaces/user.interface'

@Entity()
export class User implements Omit<IUser, 'password'> {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string

  @ApiProperty({ type: String })
  @Column()
  @Index({ unique: true })
  username: string
}
