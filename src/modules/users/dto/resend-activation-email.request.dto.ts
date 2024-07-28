import { IsEmail } from 'class-validator'

export class ResendActivationEmailRequestDto {
  /**
   * Email
   */
  @IsEmail()
  email: string
}
