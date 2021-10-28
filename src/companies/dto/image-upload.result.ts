import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString } from 'class-validator'

import { IFileUploaded } from '../../common/fileUploaded'

export class ImageUploadResult implements IFileUploaded {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  filename: string
}
