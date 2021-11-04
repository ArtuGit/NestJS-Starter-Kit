import { IsNotEmpty } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class RefreshBody {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  readonly refreshToken: string
}
