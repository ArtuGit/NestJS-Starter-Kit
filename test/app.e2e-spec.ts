import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as packageJson from '../package.json'
import * as request from 'supertest'

import { AppModule } from './../src/test.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET health check)', async () => {
    const response = await request(app.getHttpServer()).get('/healthcheck').expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        name: packageJson.name,
        version: packageJson.version,
        health: expect.objectContaining({ status: 'ok' }),
      }),
    )
  })
})
