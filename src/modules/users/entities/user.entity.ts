import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { Role } from '../../../common/roles/role.enum'
import { IUser, IUserPublic } from '../interfaces/user.interface'

@Entity()
export class User implements IUser {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  @Index({ unique: true })
  username: string

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  @Index({ unique: true })
  email: string

  @ApiProperty({
    type: String,
    isArray: true,
  })
  @Column({ type: 'simple-array', nullable: false })
  roles: Role[]

  @ApiProperty({ type: String })
  @Column({ nullable: false })
  password: string
}

export class UserPublic implements IUserPublic {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: String })
  username: string

  @ApiProperty({ type: String })
  email: string
}
