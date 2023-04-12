import { applyDecorators, CanActivate, ExecutionContext, Injectable, SetMetadata, UseGuards } from '@nestjs/common'
import { Reflector } from '@nestjs/core'

import { UsersService } from '../../modules/users/users.service'

import { Role } from './role.enum'

export const ROLES_KEY = 'roles'

function hasAnyRole(userRoles: Role[], requiredRoles: Role[]): boolean {
  return requiredRoles.some((param) => userRoles.includes(param));
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector, private readonly usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    let { user } = context.switchToHttp().getRequest()
    if (user) {
      user = await this.usersService.findOneByPayload({ id: user.userUid })
    }

    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getClass(),
      context.getHandler(),
    ])
    if (!requiredRoles.length) {
      return true
    }

    return hasAnyRole(user.roles, requiredRoles)
  }
}
