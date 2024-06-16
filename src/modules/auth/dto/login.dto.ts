import { ApiProperty } from '@nestjs/swagger'
import { IsDefined, IsNotEmpty, MaxLength, MinLength } from 'class-validator'
import { IsEmail } from '../../../shared'

export class LoginDTO {
  @ApiProperty({
    description: 'Your email',
  })
  @IsEmail()
  @IsDefined()
  email: string

  @ApiProperty({
    description: 'Your password.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string
}
