import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserRequestDto {
  @ApiProperty({
    description: 'Your full name',
  })
  @IsString()
  @IsOptional()
  fullName: string

  @ApiProperty({
    description: 'Your username',
  })
  @IsString()
  @IsOptional()
  userName: string

  @ApiProperty({
    description: 'Your email',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Your password, minimum 6 characters, maximum 24.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  password: string
}
