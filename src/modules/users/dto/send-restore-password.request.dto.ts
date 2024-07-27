import { ApiHideProperty, ApiProperty } from '@nestjs/swagger'
import { Allow, IsEmail } from 'class-validator'

export class SendRestorePasswordRequestDto {
  /**
   * Email
   */
  @IsEmail()
  email: string

  @Allow()
  @ApiHideProperty()
  requestFromApi: boolean = false
}
