import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class LoginDTO {
  @ApiProperty({
    description: 'Your email',
  })
  @IsEmail({ allow_utf8_local_part: true, allow_ip_domain: false }, { message: 'Invalid email address' })
  email: string

  @ApiProperty({
    description: 'Your password.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(32)
  password: string
}
