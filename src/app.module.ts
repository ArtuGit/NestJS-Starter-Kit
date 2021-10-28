import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { validate } from './common/env.validation'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
import { CompaniesModule } from './companies/companies.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      envFilePath: ['./config/common.env', './config/local.env'],
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    CompaniesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
