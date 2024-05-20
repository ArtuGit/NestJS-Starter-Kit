import { Module, forwardRef } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from '../users/users.module'
import { WinstonLogger } from '../../config/winston.logger'
import { JwtStrategy, LocalStrategy, RefreshTokenStrategy } from './strategy'
import { RefreshToken } from './refreshToken.entity'
import { RefreshTokenService } from './refreshToken.service'

@Module({
  imports: [forwardRef(() => UsersModule), PassportModule, TypeOrmModule.forFeature([RefreshToken])],
  controllers: [AuthController],
  providers: [AuthService, RefreshTokenService, JwtStrategy, LocalStrategy, RefreshTokenStrategy, WinstonLogger],
  exports: [RefreshTokenService, AuthService],
})
export class AuthModule {}
