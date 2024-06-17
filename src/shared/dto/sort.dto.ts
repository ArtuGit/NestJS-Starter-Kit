import { ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsOptional, IsEnum } from 'class-validator'

export class SortDTO {
  @ApiPropertyOptional({
    description: 'The field to sort by',
    example: 'createdAt',
    default: 'id',
  })
  @IsString()
  @IsOptional()
  readonly sortBy?: string = 'id'

  @ApiPropertyOptional({
    description: 'The order of sorting',
    example: 'asc',
    enum: ['asc', 'desc'],
  })
  @IsEnum(['asc', 'desc'])
  @IsOptional()
  readonly sortDir?: 'asc' | 'desc' = 'asc'
}
