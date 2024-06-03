import { TerminusModule } from '@nestjs/terminus'
import { Test, TestingModule } from '@nestjs/testing'
import { TypeOrmModule } from '@nestjs/typeorm'
import * as packageJson from '../package.json'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { typeOrmAsyncConfig } from './config'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [TerminusModule.forRoot(), TypeOrmModule.forRootAsync(typeOrmAsyncConfig)],
      controllers: [AppController],
      providers: [AppService],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('health check', () => {
    it('should return health check response', async () => {
      const response = await appController.healthCheck()
      expect(response).toEqual(
        expect.objectContaining({
          name: packageJson.name,
          version: packageJson.version,
          health: expect.objectContaining({
            status: 'ok',
          }),
        }),
      )
    })
  })
})
