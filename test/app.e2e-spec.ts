import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as packageJson from '../package.json'
import * as request from 'supertest'

import { AppModule } from './../src/app.module'

describe('AppController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/ (GET health check)', () => {
    return request(app.getHttpServer()).get('/healthcheck').expect(200).expect({
      name: packageJson.name,
      version: packageJson.version,
      healthy: true,
    })
  })
})
