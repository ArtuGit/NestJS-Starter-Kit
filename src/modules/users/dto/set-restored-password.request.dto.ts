import { Allow, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SetRestoredPasswordRequestDto {
  /**
   * Password, minimum 6 characters, maximum 24.
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  password: string

  /**
   * Repeat the new password, minimum 6 characters, maximum 24.
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  repeatPassword: string

  @Allow()
  restoreToken: string
}
