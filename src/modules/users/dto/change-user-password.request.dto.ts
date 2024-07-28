import { Allow, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class ChangeUserPasswordRequestDto {
  /**
   * Old password, minimum 6 characters, maximum 24.
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  oldPassword: string

  /**
   * New password, minimum 6 characters, maximum 24.
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  newPassword: string

  /**
   * Repeat the new password, minimum 6 characters, maximum 24.
   */
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  repeatPassword: string

  @Allow()
  id: string
}
