import { ApiPropertyOptional } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsInt, IsOptional, Min } from 'class-validator'

export class PaginationDTO {
  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1

  @ApiPropertyOptional({
    minimum: 1,
    default: 10,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly take: number = 10

  get skip(): number {
    return (this.page - 1) * this.take
  }
}
