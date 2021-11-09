import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { Connection } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import { ValidationPipe } from '@nestjs/common'

import { AppModule } from '../src/app.module'
import { CompaniesModule } from '../src/companies/companies.module'
import { TEST_USER } from '../src/users/mocks/users.mocks'
import { SignOptions } from 'jsonwebtoken'

describe('AppController (e2e)', () => {
  let app
  let moduleRef: TestingModule
  let connection: Connection
  let token: string

  beforeAll(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [AppModule, CompaniesModule],
    }).compile()

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
  })
})
