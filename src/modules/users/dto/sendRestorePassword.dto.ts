import { ApiProperty } from '@nestjs/swagger'
import { IsEmail } from 'class-validator'

export class SendRestorePasswordDTO {
  @ApiProperty({
    description: 'Your email',
  })
  @IsEmail()
  email: string

  requestFromApi: boolean = false
}
