import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm'
import { Base } from '../../shared'
import { GroupEntity } from './group.entity'
import { UserEntity } from '../users/users.entity'

@Entity('group_members')
export class GroupMemberEntity extends Base{

  @Column({ name: 'groupId' })
  groupId: string

  @Column({ name: 'userId' })
  userId: string

  @ManyToOne(() => GroupEntity, group => group.members)
  group: GroupEntity

  @ManyToOne(() => UserEntity, user => user.groups)
  user: UserEntity
} 