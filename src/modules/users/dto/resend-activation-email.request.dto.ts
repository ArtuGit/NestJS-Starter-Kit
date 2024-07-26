import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ResendActivationEmailRequestDto {
  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  email: string
}
