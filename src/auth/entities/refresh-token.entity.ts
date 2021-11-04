import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

import { IRefreshToken } from '../interfaces/tokens-interfaces'

@Entity()
export class RefreshToken implements IRefreshToken {
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
