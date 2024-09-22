import { MailerModule } from '@nestjs-modules/mailer'
import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common'

// import * as AdminJSTypeorm from '@adminjs/typeorm'
// import AdminJS from 'adminjs'

import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CacheModule } from '@nestjs/cache-manager'
import { CronModule } from './modules/cron/cron.module'
import { MailConfigService } from './config/mail.config'
import { UserEntity } from './modules/users/users.entity'
import { HttpExceptionFilter, LoggerMiddleware } from './shared'
import { JwtAuthGuard, RolesGuard } from './modules/auth/guards'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'

import { envConfig, typeOrmAsyncConfig } from './config'

import { AppController } from './app.controller'
import { AppService } from './app.service'

const DEFAULT_ADMIN = {
  email: envConfig.ADMIN_EMAIL,
  password: envConfig.ADMIN_PASSWORD,
}

const authenticate = async (email: string, password: string) => {
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    return Promise.resolve(DEFAULT_ADMIN)
  }
  return null
}

@Module({
  imports: [
    TerminusModule.forRoot({
      logger: Logger,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
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
    CronModule,
    AuthModule,
    UsersModule,
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
    AppService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*')
  }
}
