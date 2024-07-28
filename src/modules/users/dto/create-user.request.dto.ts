import { IsEmail, MaxLength, MinLength } from 'class-validator'

export class CreateUserRequestDto {
  /**
   * A user full name
   * @example 'John Doe'
   */
  fullName?: string

  /**
   * A user name
   * @example 'johndoe'
   */
  userName?: string

  /**
   * A user email
   * @example 'johndoe@mail.com'
   */
  @IsEmail()
  email: string

  /**
   * A user password
   * @example '8mY$ecure'
   */
  @MinLength(6)
  @MaxLength(24)
  password: string
}
