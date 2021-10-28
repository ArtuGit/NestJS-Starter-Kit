import { Module } from '@nestjs/common'
import { MulterModule } from '@nestjs/platform-express'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { CompaniesService } from './companies.service'
import { CompaniesController } from './companies.controller'
import {Company} from "./entities/company.entity";
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Company])],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
