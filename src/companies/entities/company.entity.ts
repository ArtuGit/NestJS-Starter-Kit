import { ApiProperty } from '@nestjs/swagger'

import { ICompany, SalesFunnelStage } from '../types/companies.types'
import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Company implements ICompany {
  @ApiProperty({ type: String })
  @PrimaryGeneratedColumn()
  id: string

  @ApiProperty({ type: String })
  @Column()
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
