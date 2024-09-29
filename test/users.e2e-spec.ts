import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'
import * as request from 'supertest'
import { faker } from '@faker-js/faker'
import { RolesEnum } from '../src/shared'
import { AppModule } from '../src/test.module'
import { CreateUserRequestDto } from '../src/modules/users/dto'

const createUserPayload: CreateUserRequestDto = {
  email: faker.internet.email().toLowerCase(),
  password: faker.internet.password(),
  fullName: faker.person.fullName(),
  userName: faker.internet.userName(),
}

describe('UsersController (e2e)', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    app = moduleFixture.createNestApplication()
    await app.init()
  })

  it('/users/register (POST)', async () => {
    const response = await request(app.getHttpServer()).post('/users/register').send(createUserPayload).expect(201)

    expect(response.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        fullName: createUserPayload.fullName,
        userName: createUserPayload.userName,
        email: createUserPayload.email,
        isEmailConfirmed: false,
        role: RolesEnum.USER,
        deleted: false,
      }),
    )
  })

  // ToDo: Add more tests for other endpoints as needed
  it.skip('/users/me (GET)', async () => {
    // Assuming a user is already authenticated and we have a valid JWT token
    const token = 'valid-jwt-token'

    const response = await request(app.getHttpServer())
      .get('/users/me')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)

    expect(response.body).toEqual(
      expect.objectContaining({
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
      }),
    )
  })
})
