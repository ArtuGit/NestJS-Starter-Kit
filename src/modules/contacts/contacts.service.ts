import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { MongoIdParam } from '../../common/dto/mongo-id.param'

import { Contact, ContactDocument } from './contact.schema'
import { CreateContactBody } from './dto/create-contact.body'

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private contactModel: Model<ContactDocument>) {}

  async create(createContactBody: CreateContactBody): Promise<Contact> {
    const createdContact = new this.contactModel(createContactBody)
    return createdContact.save()
  }

  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec()
  }

  async findOne(id: string): Promise<Contact> {
    return this.contactModel.findOne({ _id: id }).exec()
  }

  async delete(id: string) {
    const deletedContact = await this.contactModel.findByIdAndRemove({ _id: id }).exec()
    return deletedContact
  }
}
