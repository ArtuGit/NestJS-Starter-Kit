import { ApiProperty } from '@nestjs/swagger'
import { IsMongoId, IsString } from 'class-validator'

export class MongoIdParam {
  @ApiProperty({
    description: 'Id',
    required: true,
    type: String,
    default: '63eb749733cc288ee66215ae',
  })
  @IsMongoId()
  @IsString()
  id: string
}
