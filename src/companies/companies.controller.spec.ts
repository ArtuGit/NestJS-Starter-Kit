import { Test } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'

import { GetListQuery, PagedResponse } from '../common/dto/pagination'
import { mockRepository } from '../common/tests/mock.repository'

import { CompaniesController } from './companies.controller'
import { CompaniesService } from './companies.service'
import { Company } from './entities/company.entity'
import { SalesFunnelStage } from './types/companies.types'
import { CreateCompanyBody } from './dto/create-company.body'
import { UpdateCompanyBody } from './dto/update-company.body'
import { PatchCompanyBody } from './dto/patch-company.body'

const companyId = '1'

export const COMPANY_FOO: Company = {
  id: '1',
  logoURI: '/logo-foo.png',
  name: 'Foo',
  salesFunnelStage: SalesFunnelStage.Awareness,
  websiteURL: 'https://www.foo.com',
}

export const COMPANY_BAR: Company = {
  id: '2',
  logoURI: '/logo-bar.png',
  name: 'Bar',
  salesFunnelStage: SalesFunnelStage.Awareness,
  websiteURL: 'https://www.bar.com',
}

export const COMPANY_BAZ: Company = {
  id: '3',
  logoURI: '/logo-baZ.png',
  name: 'Baz',
  salesFunnelStage: SalesFunnelStage.Awareness,
  websiteURL: 'https://www.baz.com',
}

const createCompanyBody: CreateCompanyBody = {
  name: 'New company',
  salesFunnelStage: SalesFunnelStage.Awareness,
  websiteURL: 'https://www.new.com',
}

const updateCompanyBody: UpdateCompanyBody = {
  name: 'Updated name',
  salesFunnelStage: SalesFunnelStage.Engagement,
  websiteURL: null,
}

const patchCompanyBody: PatchCompanyBody = {
  name: 'Updated name',
  salesFunnelStage: SalesFunnelStage.CP,
  websiteURL: null,
}

describe('CompaniesController', () => {
  let controller: CompaniesController
  let service: CompaniesService

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [CompaniesService, { provide: getRepositoryToken(Company), useClass: mockRepository }],
    }).compile()

    service = moduleRef.get<CompaniesService>(CompaniesService)
    controller = moduleRef.get<CompaniesController>(CompaniesController)
  })

  describe('create', () => {
    it('create a company', async () => {
      jest.spyOn(service, 'create').mockImplementation(() => Promise.resolve(COMPANY_FOO))
      const res = await controller.create(createCompanyBody)
      expect(res).toEqual(expect.objectContaining(COMPANY_FOO))
    })
  })

  describe('getOne', () => {
    it('returns company detail', async () => {
      jest.spyOn(service, 'findOne').mockImplementation(() => Promise.resolve(COMPANY_FOO))
      const res = await controller.findOne(companyId)
      expect(res).toEqual(expect.objectContaining(COMPANY_FOO))
    })
  })

  describe('findAll', () => {
    it('returns a list of companies', async () => {
      const resultPage: PagedResponse<Company[]> = {
        result: [COMPANY_FOO, COMPANY_BAR, COMPANY_BAZ],
        totalCount: 3,
      }
      const query: GetListQuery = { skip: 0, sortBy: 'createdAt', sortDirection: 'ascending', take: 20 }
      jest.spyOn(service, 'findAll').mockImplementation(() => Promise.resolve(resultPage))
      const res = await controller.findAll(query)

      expect(res.result.length).toBe(3)
      expect(res.result[0]).toEqual(expect.objectContaining(COMPANY_FOO))
      expect(res.result[1]).toEqual(expect.objectContaining(COMPANY_BAR))
      expect(res.result[2]).toEqual(expect.objectContaining(COMPANY_BAZ))
    })
  })

  describe('update', () => {
    it('update a company', async () => {
      jest.spyOn(service, 'update').mockImplementation(() => Promise.resolve(COMPANY_FOO))
      const res = await controller.update(companyId, updateCompanyBody)
      expect(res).toEqual(expect.objectContaining(COMPANY_FOO))
    })
  })

  describe('patch', () => {
    it('patch a company', async () => {
      jest.spyOn(service, 'patch').mockImplementation(() => Promise.resolve(COMPANY_FOO))
      const res = await controller.patch(companyId, patchCompanyBody)
      expect(res).toEqual(expect.objectContaining(COMPANY_FOO))
    })
  })

  describe('delete', () => {
    it('delete a company', async () => {
      jest.spyOn(service, 'remove').mockImplementation(() => Promise.resolve())
      const res = controller.remove(companyId)
      await expect(res).resolves.toBe(undefined)
      await expect(res).resolves.not.toThrow()
    })
  })
})
