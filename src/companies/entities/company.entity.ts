import { ApiProperty } from '@nestjs/swagger'

import { ICompany, SalesFunnelStage } from '../types/companies.types'

export class Company implements ICompany {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: String })
  name: string

  @ApiProperty({ enum: SalesFunnelStage })
  salesFunnelStage: SalesFunnelStage

  @ApiProperty({ type: String })
  websiteURL?: string

  @ApiProperty({ type: String })
  logoURI?: string
}
