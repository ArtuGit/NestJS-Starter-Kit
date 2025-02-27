import { MailerModule } from '@nestjs-modules/mailer'
import { Module, Logger, NestModule, MiddlewareConsumer } from '@nestjs/common'

import { typeOrmConfig } from '../src/config/typeorm.config'

import { TerminusModule } from '@nestjs/terminus'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ScheduleModule } from '@nestjs/schedule'
import { APP_FILTER, APP_GUARD } from '@nestjs/core'
import { JwtModule } from '@nestjs/jwt'
import { ServeStaticModule } from '@nestjs/serve-static'
import { CacheModule } from '@nestjs/cache-manager'
import { AdminPanelProvider } from './libs'
import { CronModule } from './modules/cron/cron.module'
import { MailConfigService } from './config/mail.config'
import { UserEntity } from './modules/users/users.entity'
import { GroupEntity } from './modules/group/group.entity'
import { HttpExceptionFilter, LoggerMiddleware } from './shared'
import { JwtAuthGuard, RolesGuard } from './modules/auth/guards'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { GroupModule } from './modules/group/group.module'
import { PostEntity } from './modules/post/post.entity'
import { PostModule } from './modules/post/post.module'
import { GroupMemberEntity } from './modules/group/group-member.entity'

import { envConfig, typeOrmAsyncConfig } from './config'

import { AppController } from './app.controller'
import { AppService } from './app.service'
@Module({
  imports: [
    import('@adminjs/nestjs').then(({ AdminModule }) =>
      AdminModule.createAdminAsync({
        useFactory: async () => {
          const { AdminJS } = await import('adminjs')
          const AdminJSTypeORM = await import('@adminjs/typeorm')
          const adminPanelProvider = new AdminPanelProvider(typeOrmConfig)

          AdminJS.registerAdapter({ Database: AdminJSTypeORM.Database, Resource: AdminJSTypeORM.Resource })
          return {
            adminJsOptions: {
              rootPath: '/admin',
              resources: [
                {
                  resource: UserEntity,
                },
                {
                  resource: GroupEntity,
                },
                {
                  resource: PostEntity,
                },
                {
                  resource: GroupMemberEntity,
                },
              ],
            },
            auth: {
              authenticate: adminPanelProvider.authenticate,
              cookieName: 'adminjs',
              cookiePassword: 'secret',
            },
            sessionOptions: {
              resave: true,
              saveUninitialized: true,
              secret: 'secret',
            },
          }
        },
      }),
    ),
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
    GroupModule,
    PostModule,
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
