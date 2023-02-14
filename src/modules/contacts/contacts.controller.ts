import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { MongoIdParam } from '../../common/dto/mongo-id.param'

import { ContactsService } from './contacts.service'
import { Contact } from './contact.schema'
import { CreateContactBody } from './dto/create-contact.body'

@ApiTags('Contact')
@Controller({
  path: 'contact',
  version: '1',
})
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createCatBody: CreateContactBody): Promise<Contact> {
    return this.contactsService.create(createCatBody)
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: MongoIdParam): Promise<Contact> {
    return this.contactsService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.contactsService.delete(id)
  }
}
