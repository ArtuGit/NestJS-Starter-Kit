import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { EntityNotFoundError, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { TokenExpiredError } from 'jsonwebtoken'

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

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>,
  ) {}

  async create(createCompanyBody: CreateCompanyBody): Promise<Company> {
    const company = {
      ...new Company(),
      ...createCompanyBody,
    }
    return this.companyRepository.save(company)
  }

  async findAll(query: GetListQuery): Promise<PagedResponse<Company[]>> {
    // query is not used for now, but it is ready
    const companies = await this.companyRepository.find()
    return {
      result: companies,
      totalCount: companies.length,
    }
  }

  async checkExisting(id: string): Promise<Company> {
    try {
      const company = await this.companyRepository.findOneOrFail(id)
      return company
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new NotFoundException(`Company id=${id} is not found`)
      }
    }
  }

  async findOne(id: string): Promise<Company> {
    const company = await this.checkExisting(id)
    return company
  }

  async update(id: string, updateCompanyBody: UpdateCompanyBody): Promise<Company> {
    let company = await this.checkExisting(id)
    await this.companyRepository.update(id, updateCompanyBody)
    return  this.checkExisting(id)
  }

  // async patch(id: string, patchCompanyBody: PatchCompanyBody): Promise<Company> {
  //   const exCompId = await this.checkExisting(id)
  //   const exComp = this.companies[exCompId]
  //   this.companies[exCompId] = {
  //     ...exComp,
  //     ...patchCompanyBody,
  //   }
  //   return this.companies[exCompId]
  // }
  //
  // async setLogo(id: string, logoURI: string): Promise<Company> {
  //   const exCompId = await this.checkExisting(id)
  //   return this.companies[exCompId]
  // }

  async remove(id: string): Promise<void> {
    const company = await this.checkExisting(id)
    await this.companyRepository.delete(id)
  }
}
