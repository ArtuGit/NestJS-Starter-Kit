import {ApiProperty, PartialType} from '@nestjs/swagger'

import { UpdateCompanyBody } from './update-company.body'
import {IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, ValidateIf} from "class-validator";
import {SalesFunnelStage} from "../types/companies.types";

export class PatchCompanyBody  {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  name: string

  @ApiProperty({ enum: SalesFunnelStage })
  @IsOptional()
  @IsEnum(SalesFunnelStage)
  salesFunnelStage: SalesFunnelStage

  @ApiProperty({ type: String })
  @IsOptional()
  @IsUrl()
  websiteURL: string
}
