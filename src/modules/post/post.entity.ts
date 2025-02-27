import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm'
import { Base } from '../../config'
import { UserEntity } from '../users/users.entity'

@Entity('posts')
export class PostEntity extends Base {
  @Column()
  title: string

  @Column({ type: 'text' })
  content: string

  @ManyToOne(() => UserEntity, user => user.posts)
  @JoinColumn({ name: 'authorId' })
  author: UserEntity

  @Column()
  authorId: string
} 