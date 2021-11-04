import { IsEmail, IsNotEmpty, MinLength } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RegisterBody {
  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'An username is required' })
  readonly username: string

  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string

  @ApiProperty({ type: String })
  @IsNotEmpty({ message: 'A password is required' })
  @MinLength(6, { message: 'Your password must be at least 6 characters' })
  readonly password: string
}
