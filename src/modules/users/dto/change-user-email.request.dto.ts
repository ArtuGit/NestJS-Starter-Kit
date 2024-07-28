import { Allow, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SendChangeUserEmailMessageDto {
  @Allow()
  id: string

  /**
   * New email
   */
  @IsEmail()
  email: string

  /**
   * Password
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  password: string
}
