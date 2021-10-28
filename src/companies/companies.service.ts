import { Injectable, NotFoundException } from '@nestjs/common'

import { GetListQuery, PagedResponse } from '../common/pagination'

import { CreateCompanyBody } from './dto/create-company.body'
import { UpdateCompanyBody } from './dto/update-company.body'
import { PatchCompanyBody } from './dto/patch-company.body'
import { Company } from './entities/company.entity'
import { ICompany } from './types/companies.types'
import { companiesStorage } from './storage/companies.storage'

@Injectable()
export class CompaniesService {
  private readonly companies: ICompany[]

  constructor() {
    this.companies = companiesStorage
  }

  async create(createCompanyBody: CreateCompanyBody): Promise<Company> {
    const id = Math.floor(10000000 + Math.random() * 90000000).toString()
    const company: Company = {
      id,
      ...createCompanyBody,
    }
    this.companies.push(company)
    return company
  }

  async findAll(query: GetListQuery): Promise<PagedResponse<Company[]>> {
    // query is not used for now, but it is ready
    return {
      result: this.companies,
      totalCount: this.companies.length,
    }
  }

  async findIndex(id: string): Promise<number> {
    const exCompId: number = this.companies.findIndex((el) => el.id === id)
    if (exCompId === -1) {
      throw new NotFoundException(`Company id=${id} is not found`)
    }
    return exCompId
  }

  async findOne(id: string): Promise<Company> {
    const exCompId = await this.findIndex(id)
    return this.companies[exCompId]
  }

  async update(id: string, updateCompanyBody: UpdateCompanyBody): Promise<Company> {
    const exCompId = await this.findIndex(id)
    this.companies[exCompId] = {
      id,
      ...updateCompanyBody,
    }
    return this.companies[exCompId]
  }

  async patch(id: string, patchCompanyBody: PatchCompanyBody): Promise<Company> {
    const exCompId = await this.findIndex(id)
    const exComp = this.companies[exCompId]
    this.companies[exCompId] = {
      ...exComp,
      ...patchCompanyBody,
    }
    return this.companies[exCompId]
  }

  async setLogo(id: string, logoURI: string): Promise<Company> {
    const exCompId = await this.findIndex(id)
    const exComp = this.companies[exCompId]
    this.companies[exCompId].logoURI = logoURI
    return this.companies[exCompId]
  }

  async remove(id: string): Promise<boolean> {
    const exCompId = await this.findIndex(id)
    this.companies.splice(exCompId, 1)
    return true
  }
}
