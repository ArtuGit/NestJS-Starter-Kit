import { ApiProperty } from '@nestjs/swagger'
import { Allow, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ChangeUserNamesRequestDto {
  @ApiProperty({
    description: 'Full name',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName: string

  @ApiProperty({
    description: 'Username',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userName: string

  @Allow()
  id: string
}
