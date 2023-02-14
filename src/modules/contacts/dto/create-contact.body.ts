import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator'

export class CreateContactBody {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly firstName: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  readonly lastName: string

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  readonly title?: string

  @ApiProperty({ type: Date })
  @IsDateString()
  @IsOptional()
  readonly birthdate?: string
}
