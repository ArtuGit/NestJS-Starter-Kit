import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm'

@Entity('refresh-token')
export class RefreshToken extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ unique: true })
  token: string

  @Column()
  userId: string

  @Column({ type: 'timestamp' })
  expiresAt: Date
}
