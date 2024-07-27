import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class ResendActivationEmailRequestDto {
  /**
   * Email
   */
  @IsEmail()
  email: string
}
