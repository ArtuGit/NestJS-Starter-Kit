import { ApiProperty, PartialType } from '@nestjs/swagger'
import { IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf } from 'class-validator'

import { SalesFunnelStage } from '../types/companies.types'

import { UpdateCompanyBody } from './update-company.body'

export class PatchCompanyBody {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name?: string

  @ApiProperty({ enum: SalesFunnelStage })
  @IsOptional()
  @IsEnum(SalesFunnelStage)
  salesFunnelStage?: SalesFunnelStage

  @ApiProperty({ type: String })
  @IsOptional()
  @IsUrl()
  websiteURL?: string
}
