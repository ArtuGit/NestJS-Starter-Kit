import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from './modules/auth/auth.module'
import { UsersService } from './users.service'
import { User } from './entities/user.entity'
import { UsersController } from './users.controller'

@Module({
  imports: [ConfigModule, forwardRef(() => AuthModule), TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
