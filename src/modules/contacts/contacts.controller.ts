import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { ContactsService } from './contacts.service'
import { Contact } from './contact.schema'
import { CreateContactBody } from './dto/create-contact.body'

@ApiTags('Contact')
@Controller({
  path: 'contact',
  version: '1',
})
export class ContactsController {
  constructor(private readonly catsService: ContactsService) {}

  @Post()
  create(@Body() createCatBody: CreateContactBody): Promise<Contact> {
    return this.catsService.create(createCatBody)
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return this.catsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Contact> {
    return this.catsService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.catsService.delete(id)
  }
}
