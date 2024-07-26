import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { IsEmail } from '../../../shared'

export class LoginDTO {
  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  @IsDefined()
  email: string

  @ApiProperty({
    description: 'Password',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string
}
