import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

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

  @ApiCreatedResponse({ type: Contact })
  @Post()
  create(@Body() createContactBody: CreateContactBody): Promise<Contact> {
    return this.contactsService.create(createContactBody)
  }

  @Get()
  async findAll(): Promise<Contact[]> {
    return this.contactsService.findAll()
  }

  @ApiOkResponse({ type: Contact })
  @Get(':id')
  async findOne(@Param('id') id: MongoIdParam): Promise<Contact> {
    return this.contactsService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id') id: MongoIdParam) {
    return this.contactsService.delete(id)
  }
}
