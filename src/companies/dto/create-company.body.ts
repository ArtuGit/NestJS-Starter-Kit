import { ApiProperty } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

import { SalesFunnelStage } from '../types/companies.types'

export class CreateCompanyBody {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ enum: SalesFunnelStage })
  @IsEnum(SalesFunnelStage)
  @IsNotEmpty()
  salesFunnelStage: SalesFunnelStage = SalesFunnelStage.Awareness

  @ApiProperty({ type: String })
  @IsUrl()
  @IsOptional()
  websiteURL?: string
}
