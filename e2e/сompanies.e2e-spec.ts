import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { Connection } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { ValidationPipe } from '@nestjs/common'
import { SignOptions } from 'jsonwebtoken'
import { getRepositoryToken } from '@nestjs/typeorm'

import { AppModule } from '../src/app.module'
import { CompaniesModule } from '../src/companies/companies.module'
import { TEST_USER } from '../src/users/mocks/users.mocks'
import { CreateCompanyBody } from '../../NestJS Samples/rest-api-swagger/dist/companies/dto/create-company.body'
import { COMPANY_BAR, COMPANY_BAZ, COMPANY_FOO, createCompanyBody } from '../src/companies/companies.controller.spec'
import { Company } from '../../NestJS Samples/rest-api-swagger/dist/companies/entities/company.entity'
import { PagedResponse } from '../src/common/dto/pagination'

describe('Companies', () => {
  let app
  let moduleRef: TestingModule
  let connection: Connection
  let token: string

  const findMock = jest.fn()

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, CompaniesModule],
    })
      .overrideProvider(getRepositoryToken(Company))
      .useFactory({
        factory: () => ({
          create: jest.fn(() => new Promise((resolve) => resolve(COMPANY_FOO))),
          find: findMock,
          update: jest.fn((id, body) => new Promise((resolve) => resolve(COMPANY_FOO))),
          findOne: jest.fn(
            ({ id }) =>
              new Promise((resolve) => {
                resolve(COMPANY_FOO)
              }),
          ),
          delete: jest.fn((id) => new Promise((resolve) => resolve(undefined))),
          save: jest.fn(
            (data) =>
              new Promise((resolve) => {
                resolve(data)
              }),
          ),
        }),
      })

      .compile()

    const jwtService = moduleRef.get(JwtService)
    const opts: SignOptions = {
      subject: String(TEST_USER.id),
    }
    token = jwtService.sign({ refreshTokenId: '1' }, opts)

    connection = moduleRef.get(Connection)
    app = moduleRef.createNestApplication()

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )

    await app.init()
  })

  afterAll(async () => {
    await moduleRef.close()
  })

  describe('POST /companies', () => {
    it('returns 401 Unauthorized when auth token is invalid', async () => {
      const res = await request(app.getHttpServer()).post('/companies').set('Authorization', 'Bearer Bear')
      expect(res.status).toBe(401)
    })

    it('returns 400 Bad Request when payload is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/companies')
        .set('Authorization', `Bearer ${token}`)
        .send({ foo: 'bar' })

      expect(res.status).toBe(400)
    })

    it('returns 201 Created with created company in body', async () => {
      const body: CreateCompanyBody = createCompanyBody

      const createdCompany = { ...body, logoURI: '' } as Company

      const res = await request(app.getHttpServer())
        .post('/companies')
        .send(body)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(201)
      expect(res.body).toEqual(createdCompany)
    })
  })

  describe('GET /companies', () => {
    it('returns 401 Unauthorized when auth token is invalid', async () => {
      const res = await request(app.getHttpServer()).get('/companies').set('Authorization', 'Bearer skunk')
      expect(res.status).toBe(401)
    })

    it('returns 200 OK with list of companies in body', async () => {
      const skip = 0
      const take = 5
      const retVal: PagedResponse<Company[]> = {
        result: [COMPANY_FOO, COMPANY_BAR, COMPANY_BAZ],
        totalCount: 3,
      }

      findMock.mockImplementationOnce(() => new Promise((resolve) => resolve(retVal)))

      const res = await request(app.getHttpServer())
        .get(`/companies?skip=${skip}&take=${take}`)
        .set('Authorization', `Bearer ${token}`)

      expect(res.status).toBe(200)
      expect(res.body.result.result[0]).toEqual(expect.objectContaining(COMPANY_FOO))
      expect(res.body.result.result[1]).toEqual(expect.objectContaining(COMPANY_BAR))
      expect(res.body.result.result[2]).toEqual(expect.objectContaining(COMPANY_BAZ))
      expect(res.body.result.totalCount).toEqual(3)
      expect(findMock).toBeCalledWith({ take, skip })
    })
  })
})
