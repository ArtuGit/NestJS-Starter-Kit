import { Test, TestingModule } from '@nestjs/testing'
import * as packageJson from '../package.json'


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
    it('should return health check response', () => {
      expect(appController.healthCheck()).toStrictEqual({
        name: packageJson.name,
        version: packageJson.version,
        healthy: true,
      })
    })
  })
})
