import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Roles } from '../decorators'
import { UserEntity } from '../../users/users.entity'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRoles: string) {
    return roles.some((roles) => roles === userRoles)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const role = this.reflector.get(Roles, context.getHandler())

    if (!role) return true

    const request = context.switchToHttp().getRequest()

    const user = request.user as UserEntity & { session: string }

    return this.matchRoles(role, user.role)
  }
}
