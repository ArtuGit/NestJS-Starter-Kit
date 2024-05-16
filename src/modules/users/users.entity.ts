import { BeforeInsert, Column, Entity, Index, OneToMany, ManyToOne, JoinColumn } from 'typeorm'
import { ApiProperty } from '@nestjs/swagger'

import { HashProvider } from './providers'
import { Base } from '../../config'
import { RolesEnum } from './enums'
// import { UserPhone } from '../userPhones/userPhones.entity'
// import { Transaction } from '../transactions/transactions.entity'

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

  @ApiProperty()
  @Column({ select: false })
  password: string

  @ApiProperty({
    default: RolesEnum.PRIMARY_USER,
  })
  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.PRIMARY_USER,
  })
  role: RolesEnum

  @Column({
    nullable: true,
  })
  stripeCustomerId: string

  @ApiProperty({
    default: 'External api key',
  })
  @Column({ select: false })
  @Index({ unique: true })
  apiAccessKey: string

  @Column({ type: 'uuid', nullable: true })
  primaryUserId: string

  @Column({ type: 'float4', default: 0 })
  balance: number

  @OneToMany(() => User, (user) => user.primaryUser)
  subUsers: User[]

  @ManyToOne(() => User, (user) => user.subUsers)
  @JoinColumn({ name: 'primaryUserId' })
  primaryUser: User

  // @OneToMany(() => UserPhone, (userPhones) => userPhones.user)
  // userPhones: UserPhone[]
  //
  // @OneToMany(() => Transaction, (transactions) => transactions.fromUser, {
  //   onDelete: 'SET NULL',
  // })
  // transactionFrom: Transaction[]
  //
  // @OneToMany(() => Transaction, (transactions) => transactions.toUser, {
  //   onDelete: 'SET NULL',
  // })
  // transactionTo: Transaction[]

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
    const { password, apiAccessKey, ...user } = this
    return user as Omit<User, 'password' | 'apiAccessKey'>
  }

  async checkPassword(password: string): Promise<boolean> {
    return new HashProvider().compareHash(password, this.password)
  }
}
