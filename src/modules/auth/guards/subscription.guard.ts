import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'

import { TokenPayloadType } from '../types/types'
import { RolesEnum } from '../../users/enums'

@Injectable()
export class SubscriptionGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const user = request.user as TokenPayloadType

    if (user?.subscriptionExpired && user.role !== RolesEnum.SITE_ADMIN)
      throw new ForbiddenException('Subscription not active, please contact team owner.')

    return true
  }
}
