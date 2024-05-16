import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ResendActivationEmailDTO {
  @ApiProperty({
    description: 'Your email',
  })
  @IsEmail()
  email: string
}
