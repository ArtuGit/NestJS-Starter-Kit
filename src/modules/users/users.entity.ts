import { BeforeInsert, Column, Entity, Index, ManyToMany } from 'typeorm'
import { ApiHideProperty } from '@nestjs/swagger'

import { Base } from '../../config'
import { HashProvider } from '../../libs'
import { RolesEnum } from '../../shared'
import { GroupEntity } from '../group/group.entity'

@Entity('users')
export class UserEntity extends Base {
  /**
   * Full name of the user
   */
  @Column({ nullable: true })
  fullName: string

  /**
   * User name
   */
  @Column({ nullable: true })
  userName: string

  /**
   * User email
   */
  @Column()
  @Index({ unique: true })
  email: string

  /**
   * User email confirmation status
   */
  @Column({ default: false })
  isEmailConfirmed: boolean

  @Column({ select: false })
  password: string

  /**
   * User role
   */
  @Column({
    type: 'enum',
    enum: RolesEnum,
    default: RolesEnum.USER,
  })
  role: RolesEnum

  @ApiHideProperty()
  @Column({ select: false, default: false })
  deleted: boolean

  @ManyToMany(() => GroupEntity, (group) => group.members)
  groups: GroupEntity[]

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = this
    return user as Omit<UserEntity, 'password' | 'apiAccessKey'>
  }

  async checkPassword(password: string): Promise<boolean> {
    return new HashProvider().compareHash(password, this.password)
  }
}
