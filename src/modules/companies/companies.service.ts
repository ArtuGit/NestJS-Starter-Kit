import { unlink } from 'fs/promises'

import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { EntityNotFoundError, Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { GetListQuery, PagedResponse } from '../../common/dto/pagination'

import { CreateCompanyBody } from './dto/create-company.body'
import { UpdateCompanyBody } from './dto/update-company.body'
import { PatchCompanyBody } from './dto/patch-company.body'
import { Company } from './entities/company.entity'

@Injectable()
export class CompaniesService {
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
    const companies = await this.companyRepository.find({
      take: query.take,
      skip: query.skip,
    })
    return {
      result: companies,
      totalCount: companies.length,
    }
  }

  async checkExisting(id: string): Promise<Company> {
    try {
      const company = await this.companyRepository.findOneOrFail({ where: { id } })
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
    const company = await this.checkExisting(id)
    await this.companyRepository.update(id, updateCompanyBody)
    return this.checkExisting(id)
  }

  async patch(id: string, patchCompanyBody: PatchCompanyBody): Promise<Company> {
    const companyEx = await this.checkExisting(id)
    const companyUpd = {
      ...companyEx,
      ...patchCompanyBody,
    }
    await this.companyRepository.update(id, companyUpd)
    return await this.checkExisting(id)
  }

  async setLogo(id: string, logoURI: string): Promise<Company> {
    const companyEx = await this.checkExisting(id)
    const companyUpd = {
      logoURI: 'uploads/' + logoURI,
    }
    await this.companyRepository.update(id, companyUpd)
    if (companyEx.logoURI) {
      try {
        await unlink(companyEx.logoURI)
      } catch (error) {
        console.error(`Error on the old logo ${companyEx.logoURI} (company id=${id}) deleting:`, error.message)
      }
    }
    return await this.checkExisting(id)
  }

  async remove(id: string): Promise<void> {
    const company = await this.checkExisting(id)
    if (company.logoURI) {
      try {
        await unlink(company.logoURI)
      } catch (error) {
        console.error('Error on the old logo ${companyEx.logoURI} (company id=${id}) deleting:', error.message)
      }
    }
    await this.companyRepository.delete(id)
  }
}
