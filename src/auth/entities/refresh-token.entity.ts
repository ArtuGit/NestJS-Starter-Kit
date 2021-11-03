import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class RefreshToken {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string

  @ApiProperty({ type: String })
  @Column()
  userId: string

  @ApiProperty({ type: Boolean })
  @Column()
  isRevoked: boolean

  @ApiProperty({ type: Date })
  @Column()
  expires: Date
}
