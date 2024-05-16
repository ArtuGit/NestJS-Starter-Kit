import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateSubUserDTO {
  @ApiProperty({
    description: 'Sub-User id',
  })
  subUserId: string

  @ApiProperty({
    description: 'Sub-User full name',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  fullName?: string

  @ApiProperty({
    description: 'Sub-User username',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  userName?: string

  @ApiProperty({
    description: 'Sub-User email',
  })
  @IsEmail()
  @IsOptional()
  email?: string

  @ApiProperty({
    description: 'Sub-User password, minimum 6 characters, maximum 24.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  @IsOptional()
  password?: string
}
