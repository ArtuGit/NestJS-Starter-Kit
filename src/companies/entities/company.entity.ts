import { ApiProperty } from '@nestjs/swagger'
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm'

import { ICompany, SalesFunnelStage } from '../types/companies.types'

@Entity()
export class Company implements ICompany {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string

  @ApiProperty({ type: String })
  @Column()
  @Index({ unique: true })
  name: string

  @ApiProperty({ enum: SalesFunnelStage })
  @Column()
  salesFunnelStage: SalesFunnelStage

  @ApiProperty({ type: String })
  @Column()
  websiteURL?: string = ''

  @ApiProperty({ type: String })
  @Column()
  logoURI?: string = ''
}
