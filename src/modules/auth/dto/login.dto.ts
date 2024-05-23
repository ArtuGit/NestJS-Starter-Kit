import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { IsEmail } from '../../../shared'

export class LoginDTO {
  @ApiProperty({
    description: 'Your email',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Your password.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string
}
