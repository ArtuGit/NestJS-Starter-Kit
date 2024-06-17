import { ApiProperty } from '@nestjs/swagger'
import { Allow, IsEmail, IsNotEmpty, MaxLength, MinLength } from 'class-validator'

export class SendChangeUserEmailMessageDto {
  @Allow()
  id: string

  @ApiProperty({
    description: 'Your new email.',
  })
  @IsEmail()
  email: string

  @ApiProperty({
    description: 'Your password, minimum 6 characters, maximum 24.',
  })
  @IsNotEmpty()
  @MinLength(6)
  @MaxLength(24)
  password: string
}
