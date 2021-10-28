import { ApiProperty } from '@nestjs/swagger'
import { IsNumber, IsOptional, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export interface PagedResponse<T> {
  result: T
  totalCount: number
}

export type TSortDirection = 'ascending' | 'descending'

export type TSortByDefault = 'id' | 'createdAt' | 'updatedAt'

export interface IGetListQuery<TSortBy = TSortByDefault> {
  readonly take?: string | number
  readonly skip?: string | number
  readonly sortBy?: TSortBy
  readonly sortDirection?: TSortDirection
}

export class GetListQuery<TSortBy = TSortByDefault> implements IGetListQuery<TSortBy> {
  @ApiProperty({
    type: Number,
    default: 20,
    description: 'The number of records to fetch',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly take: number = 20

  @ApiProperty({
    type: Number,
    default: 0,
    description: 'The number of records to skip',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  readonly skip: number = 0

  @ApiProperty({
    type: String,
    default: 'createdAt',
    description: 'The field to sort the records by',
  })
  @IsOptional()
  @IsString()
  readonly sortBy?: TSortBy

  @ApiProperty({
    type: String,
    default: 'asc',
    description: 'The direction to sort the records in',
  })
  @IsOptional()
  @IsString()
  readonly sortDirection?: TSortDirection
}
