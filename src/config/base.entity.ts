import { ApiProperty } from '@nestjs/swagger'
import { BaseEntity, Column, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

export class Base extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ApiProperty()
  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @ApiProperty()
  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  updatedAt: Date
}
