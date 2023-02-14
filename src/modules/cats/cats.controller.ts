import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CatsService } from './cats.service'
import { Cat } from './cat.schema'
import { CreateCatBody } from './dto/create-cat.body'

@ApiTags('Cats')
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  create(@Body() createCatBody: CreateCatBody): Promise<Cat> {
    return this.catsService.create(createCatBody)
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Cat> {
    return this.catsService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catsService.delete(id)
  }
}
