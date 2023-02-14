import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ContactsController } from './contacts.controller'
import { ContactsService } from './contacts.service'
import { Contact, ContactSchema } from './contact.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Contact.name, schema: ContactSchema }])],
  controllers: [ContactsController],
  providers: [ContactsService],
})
export class ContactsModule {}
