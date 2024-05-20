import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class SendRestorePasswordRequestDto {
  @ApiProperty({
    description: 'Your email',
  })
  @IsEmail()
  email: string

  requestFromApi: boolean = false
}
