import { ApiProperty, PartialType } from '@nestjs/swagger'
import {IsEnum, IsNotEmpty, IsString, IsUrl, ValidateIf} from 'class-validator'

import { SalesFunnelStage } from '../types/companies.types'

export class UpdateCompanyBody {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string

  @ApiProperty({ enum: SalesFunnelStage })
  @IsEnum(SalesFunnelStage)
  @IsNotEmpty()
  salesFunnelStage: SalesFunnelStage

  @ApiProperty({ type: String })
  @ValidateIf(o => o.websiteURL !== "")
  @IsUrl()
  websiteURL?: string = ""
}
