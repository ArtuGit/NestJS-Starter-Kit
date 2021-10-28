import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

export class LoginBody {
  @ApiProperty({ type: String, example: 'john' })
  @IsString()
  @IsNotEmpty()
  username: string

  @ApiProperty({ type: String, example: 'secret' })
  @IsString()
  @IsNotEmpty()
  password: string
}
