import { ApiProperty } from '@nestjs/swagger'
import { Allow, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class ChangeUserPasswordRequestDto {
  @ApiProperty({
    description: 'Your old password, minimum 6 characters, maximum 24.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  oldPassword: string

  @ApiProperty({
    description: 'Your new password, minimum 6 characters, maximum 24.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  newPassword: string

  @ApiProperty({
    description: 'Repeat your new password, minimum 6 characters, maximum 24.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  repeatPassword: string

  @Allow()
  id: string
}
