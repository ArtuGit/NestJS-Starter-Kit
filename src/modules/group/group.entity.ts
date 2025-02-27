import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm'
import { Base } from '../../config'
import { UserEntity } from '../users/users.entity'

@Entity('groups')
export class GroupEntity extends Base {
  @Column()
  name: string

  @Column({ nullable: true })
  description: string

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'adminId' })
  admin: UserEntity

  @Column({ nullable: true })
  adminId: string

  @ManyToMany(() => UserEntity, user => user.groups)
  @JoinTable({
    name: 'group_members',
    joinColumn: { name: 'groupId' },
    inverseJoinColumn: { name: 'userId' },
  })
  members: UserEntity[]
}
