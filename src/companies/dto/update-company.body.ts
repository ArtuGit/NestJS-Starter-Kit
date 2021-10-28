import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator'

import { SalesFunnelStage } from '../types/companies.types'

import { CreateCompanyBody } from './create-company.body'

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
  @IsUrl()
  @IsOptional()
  websiteURL?: string
}
