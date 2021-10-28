import { ApiProperty } from '@nestjs/swagger'

export class RefreshToken {
  @ApiProperty({ type: String })
  id: string

  @ApiProperty({ type: String })
  userId: string

  @ApiProperty({ type: Boolean })
  isRevoked: boolean

  @ApiProperty({ type: Date })
  expires: Date
}
