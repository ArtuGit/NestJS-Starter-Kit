import { Module, forwardRef } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { User } from './users.entity'
import { WinstonLogger } from '../../config'
import { SendEmailModule } from '../send-email/send-email.module'
import { AuthModule } from '../auth/auth.module'
// import { StripeModule } from '../stripe/stripe.module'
// import { TransactionsModule } from '../transactions/transactions.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    SendEmailModule,
    forwardRef(() => AuthModule),
    // StripeModule,
    // TransactionsModule,
  ],
  controllers: [UsersController],
  providers: [UsersService, WinstonLogger],
  exports: [UsersService],
})
export class UsersModule {}