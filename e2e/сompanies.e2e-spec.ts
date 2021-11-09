import * as request from 'supertest'
import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Connection } from 'typeorm'

import { CompaniesModule } from '../src/companies/companies.module'
import { CompaniesService } from '../src/companies/companies.service'
import { AppModule } from '../../NestJS Samples/rest-api-swagger/dist/app.module'
import { Company } from '../../NestJS Samples/rest-api-swagger/dist/companies/entities/company.entity'
import { COMPANY_BAR, COMPANY_BAZ, COMPANY_FOO } from '../src/companies/companies.controller.spec'
import { mockRepository } from '../src/common/tests/mock.repository'

describe('Companies', () => {
  let app: INestApplication
  let moduleRef: TestingModule
  let connection: Connection

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()
    connection = moduleRef.get(Connection)
    app = moduleRef.createNestApplication()
    await app.init()
  })

  // beforeAll(async () => {
  //   moduleRef = await Test.createTestingModule({
  //     imports: [CompaniesModule],
  //     providers: [CompaniesService, ],
  //   })
  //
  //     // .overrideProvider(getRepositoryToken(Company))
  //     // .useFactory({
  //     //   factory: () => ({
  //     //     create: jest.fn(() => new Promise((resolve) => resolve(COMPANY_FOO))),
  //     //     find: jest.fn(() => new Promise((resolve) => resolve([COMPANY_FOO, COMPANY_BAR, COMPANY_BAZ]))),
  //     //     update: jest.fn((id, body) => new Promise((resolve) => resolve(COMPANY_FOO))),
  //     //     findOne: jest.fn(
  //     //       ({ id }) =>
  //     //         new Promise((resolve) => {
  //     //           resolve(COMPANY_FOO)
  //     //         }),
  //     //     ),
  //     //     delete: jest.fn((id) => new Promise((resolve) => resolve(true))),
  //     //     save: jest.fn(
  //     //       (data) =>
  //     //         new Promise((resolve) => {
  //     //           // data = data.id === undefined ? data.id = id() : data;
  //     //           resolve(data)
  //     //         }),
  //     //     ),
  //     //   }),
  //     // })
  //
  //     .compile()
  //
  //   connection = moduleRef.get(Connection)
  //   app = moduleRef.createNestApplication()
  //   await app.init()
  // })

  afterAll(async () => {
    await moduleRef.close()
    await app.close()
  })

  afterEach(async () => {
    await connection.synchronize(true)
  })

  it('/cat (POST)', () => {
    return request(app.getHttpServer()).post('/companies').send('catDTO').expect(401).expect({
      name: 'Ulla',
      color: 'Black',
      id: 1,
    })
  })

  // describe('POST /companies', () => {
  //   it('returns 401 Unauthorized when auth token is invalid', async () => {
  //     const res = await request(app.getHttpServer()).post('/companies').set('Authorization', 'Bearer dog')
  //     expect(res.status).toBe(401)
  //   })

  // it('returns 400 Bad Request when payload is invalid', async () => {
  //   const res = await request(app.getHttpServer())
  //     .post('/shows')
  //     .set('Authorization', `Bearer ${token}`)
  //     .send({ foo: 'bar' })
  //
  //   expect(res.status).toBe(400)
  // })
  //
  // it('returns 201 Created with created show in body', async () => {
  //   const body: CreateShowBody = createShowBody
  //
  //   const createdShow = { ...body, _id: '1' } as Show
  //   sendMessage.mockImplementationOnce(() => of(createdShow))
  //
  //   const res = await request(app.getHttpServer()).post('/shows').send(body).set('Authorization', `Bearer ${token}`)
  //
  //   expect(res.status).toBe(201)
  //   expect(res.body).toEqual(createdShow)
  //   expect(sendMessage).toBeCalledWith(showsActions.create, { userId, body })
  // })
  //})
})
