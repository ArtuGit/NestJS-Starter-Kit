import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ResendActivationEmailRequestDto {
  @ApiProperty({
    description: 'Your email',
  })
  @IsEmail()
  email: string
}
