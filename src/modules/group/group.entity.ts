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
  @JoinColumn()
  admin: UserEntity

  @ManyToMany(() => UserEntity, user => user.groups)
  @JoinTable({
    name: 'group_members',
    joinColumn: { name: 'group_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' },
  })
  members: UserEntity[]
} 