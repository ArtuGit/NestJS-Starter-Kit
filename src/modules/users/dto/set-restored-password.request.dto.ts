import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SetRestoredPasswordRequestDto {
  @ApiProperty({
    description: 'Your password, minimum 6 characters, maximum 24.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  password: string

  @ApiProperty({
    description: 'Repeat your new password, minimum 6 characters, maximum 24.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  repeatPassword: string

  restoreToken: string
}
