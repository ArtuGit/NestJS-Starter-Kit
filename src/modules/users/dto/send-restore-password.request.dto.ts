import { ApiProperty } from '@nestjs/swagger'
import { Allow, IsEmail } from 'class-validator'

export class SendRestorePasswordRequestDto {
  @ApiProperty({
    description: 'Email',
  })
  @IsEmail()
  email: string

  @Allow()
  requestFromApi: boolean = false
}
