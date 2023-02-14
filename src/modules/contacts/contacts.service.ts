import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Contact, ContactDocument } from './contact.schema'
import { CreateContactBody } from './dto/create-contact.body'

@Injectable()
export class ContactsService {
  constructor(@InjectModel(Contact.name) private catModel: Model<ContactDocument>) {}

  async create(createContactBody: CreateContactBody): Promise<Contact> {
    const createdContact = new this.catModel(createContactBody)
    return createdContact.save()
  }

  async findAll(): Promise<Contact[]> {
    return this.catModel.find().exec()
  }

  async findOne(id: string): Promise<Contact> {
    return this.catModel.findOne({ _id: id }).exec()
  }

  async delete(id: string) {
    const deletedContact = await this.catModel.findByIdAndRemove({ _id: id }).exec()
    return deletedContact
  }
}
