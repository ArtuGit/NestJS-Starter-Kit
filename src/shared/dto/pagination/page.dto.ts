import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { Allow, IsArray } from 'class-validator'
import { PageMetaDTO } from './pageMeta.dto'

export class PageDTO<T> {
  //eslint-disable-next-line @darraghor/nestjs-typed/validated-non-primitive-property-needs-type-decorator
  @IsArray()
  @ApiProperty({ isArray: true })
  readonly data: T[]

  //eslint-disable-next-line @darraghor/nestjs-typed/all-properties-have-explicit-defined
  @ApiProperty({ type: () => PageMetaDTO })
  @Type(() => PageMetaDTO)
  @Allow()
  readonly meta: PageMetaDTO

  constructor(data: T[], meta: PageMetaDTO) {
    this.data = data
    this.meta = meta
  }
}
