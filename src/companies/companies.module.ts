import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
