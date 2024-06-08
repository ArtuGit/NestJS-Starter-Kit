import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MailModule } from '../mail/mail.module'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './users.entity'
import { WinstonLogger } from '../../config'
import { SendEmailModule } from '../send-email/send-email.module'
import { AuthModule } from '../auth/auth.module'

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule), SendEmailModule, MailModule],
  controllers: [UsersController],
  providers: [UsersService, WinstonLogger],
  exports: [UsersService],
})
export class UsersModule {}
