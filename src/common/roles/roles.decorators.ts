import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common'
import { JwtAuthGuard } from '../../modules/users/modules/auth/guards/jwt-auth.guard'

import { Role } from './role.enum'
import { ROLES_KEY, RolesGuard } from './roles.guard'

export function AuthGuard(roles: Role[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  )
}
