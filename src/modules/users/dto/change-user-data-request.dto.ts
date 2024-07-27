import { ApiHideProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class ChangeUserDataRequestDto {
  /**
   * Full name
   */
  @IsNotEmpty()
  fullName?: string

  /**
   * Username
   */
  @IsNotEmpty()
  userName?: string

  @ApiHideProperty()
  id: string
}
