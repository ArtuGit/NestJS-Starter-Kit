import { ApiProperty } from '@nestjs/swagger'

export class ReturnMessage {
  @ApiProperty({ default: 'Ok' })
  message: string
}
