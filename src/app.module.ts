import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CacheModule } from '@nestjs/cache-manager'
import { SendEmailModule } from './modules/send-email/send-email.module'
import { HttpExceptionFilter } from './config/http-exception.filter'
import { JwtAuthGuard, RolesGuard } from './modules/auth/guards'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'

import { envConfig, typeOrmAsyncConfig } from './config'

import { AppController } from './app.controller'

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    ScheduleModule.forRoot(),
    JwtModule.register({
      global: true,
      secret: envConfig.JWT_SECRET,
      signOptions: {
        expiresIn: envConfig.JWT_EXPIRES_IN,
      },
    }),
    CacheModule.register({
      isGlobal: true,
      ttl: 0,
    }),
    ServeStaticModule.forRoot({
      rootPath: envConfig.STATIC_PATH,
      serveRoot: '/',
    }),
    AuthModule,
    UsersModule,
    SendEmailModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
