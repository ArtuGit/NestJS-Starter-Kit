import { ApiProperty } from '@nestjs/swagger'
import { Allow, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class ChangeUserNamesRequestDto {
  @ApiProperty({
    description: 'Your full name',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName: string

  @ApiProperty({
    description: 'Your username',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userName: string

  @Allow()
  id: string
}
