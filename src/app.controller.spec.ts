import { Test, TestingModule } from '@nestjs/testing'

import { AppController } from './app.controller'

describe('AppController', () => {
  let appController: AppController

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [],
    }).compile()

    appController = app.get<AppController>(AppController)
  })

  describe('health check', () => {
    it('should return "Hello World!"', () => {
      expect(appController.healthCheck()).toBe({
        name: 'nest-api',
        version: '1.0.0',
        healthy: true,
      })
    })
  })
})
