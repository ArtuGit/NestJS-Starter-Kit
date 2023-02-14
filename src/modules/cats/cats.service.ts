import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { Cat, CatDocument } from './cat.schema'
import { CreateCatBody } from './dto/create-cat.body'

@Injectable()
export class CatsService {
  constructor(@InjectModel(Cat.name) private catModel: Model<CatDocument>) {}

  async create(createCatBody: CreateCatBody): Promise<Cat> {
    const createdCat = new this.catModel(createCatBody)
    return createdCat.save()
  }

  async findAll(): Promise<Cat[]> {
    return this.catModel.find().exec()
  }

  async findOne(id: string): Promise<Cat> {
    return this.catModel.findOne({ _id: id }).exec()
  }

  async delete(id: string) {
    const deletedCat = await this.catModel.findByIdAndRemove({ _id: id }).exec()
    return deletedCat
  }
}
