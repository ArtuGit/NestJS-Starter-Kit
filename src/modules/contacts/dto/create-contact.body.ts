import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateContactBody {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  firstName: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  lastName: string

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string
}
