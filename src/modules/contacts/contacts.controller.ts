import { Controller, Get, Post, Delete, Body, Param, HttpCode, HttpStatus, UseFilters } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { ValidateMongoId } from '../../common/validations/mongo-id.validation'
import { MongoExceptionFilter } from '../../common/exceptions/mongo-exception.filter'

import { ContactsService } from './contacts.service'
import { Contact } from './contact.schema'
import { CreateContactBody } from './dto/create-contact.body'

@UseFilters(MongoExceptionFilter)
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
  async findOne(@Param('id', ValidateMongoId) id: string): Promise<Contact> {
    return this.contactsService.findOne(id)
  }

  @Delete(':id')
  async delete(@Param('id', ValidateMongoId) id: string) {
    return this.contactsService.delete(id)
  }
}
