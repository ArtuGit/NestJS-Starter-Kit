import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { UsersModule } from '../users/users.module'

import { JwtStrategy } from './strategies/jwt.strategy'
import { TokensService } from './tokens.service'
import { RefreshTokensRepository } from './refresh-tokens.repository'
import { AuthenticationController } from './auth.controller'

@Module({
  imports: [
    ConfigModule,
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<number>('JWT_ACCESS_TOKEN_DURATION_IN_MINUTES').toString() + 'm' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [RefreshTokensRepository, TokensService, JwtStrategy],
  controllers: [AuthenticationController],
})
export class AuthModule {}
