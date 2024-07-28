import { IsDefined, MaxLength, MinLength } from 'class-validator'
import { IsEmail } from '../../../shared'

export class LoginDTO {
  /**
   * Email
   */
  @IsEmail()
  @IsDefined()
  email: string

  /**
   * Password
   */
  @MinLength(6)
  @MaxLength(32)
  password: string
}
