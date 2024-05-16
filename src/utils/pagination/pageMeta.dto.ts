import { ApiProperty } from '@nestjs/swagger'
import { PaginationDTO } from './pagination.dto'

interface IPageMetaDTOParameters {
  pagination?: PaginationDTO
  count: number
}

export class PageMetaDTO {
  @ApiProperty()
  readonly page: number

  @ApiProperty()
  readonly take: number

  @ApiProperty()
  readonly count: number

  @ApiProperty()
  readonly pageCount: number

  @ApiProperty()
  readonly hasPreviousPage: boolean

  @ApiProperty()
  readonly hasNextPage: boolean

  constructor({ pagination, count }: IPageMetaDTOParameters) {
    this.page = pagination?.page || 1
    this.take = pagination?.take || 10
    this.count = count
    this.pageCount = Math.ceil(this.count / this.take)
    this.hasPreviousPage = this.page > 1
    this.hasNextPage = this.page < this.pageCount
  }
}
