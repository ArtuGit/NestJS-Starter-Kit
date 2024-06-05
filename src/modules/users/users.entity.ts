import { BeforeInsert, Column, Entity, Index, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { HashProvider } from './providers'
import { Base } from '../../config'
import { RolesEnum } from '../../shared'

@Entity('users')
export class User extends Base {
  @ApiProperty()
  @Column({ nullable: true })
  fullName: string

  @ApiProperty()
  @Column({ nullable: true })
  userName: string

  @ApiProperty()
  @Column()
  @Index({ unique: true })
  email: string

  @Column({ default: false })
  isEmailConfirmed: boolean

  @Column({ select: false })
  password: string

  @ApiProperty({
    default: RolesEnum.USER,
  })
  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER,
  })
  role: RolesEnum

  @Column({ select: false, default: false })
  deleted: boolean

  @BeforeInsert()
  async generatePasswordHash() {
    const hashProvider = new HashProvider()

    this.password = await hashProvider.generateHash(this.password)
  }

  @BeforeInsert()
  async emailToLowerCase() {
    this.email = this.email.toLowerCase()
  }

  getPublicUser() {
    const { password, ...user } = this
    return user as Omit<User, 'password' | 'apiAccessKey'>
  }

  async checkPassword(password: string): Promise<boolean> {
    return new HashProvider().compareHash(password, this.password)
  }
}
