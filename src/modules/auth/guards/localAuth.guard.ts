import { BadRequestException, ExecutionContext, Injectable } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { LoginDTO } from '../dto'

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<any> {
    const request = context.switchToHttp().getRequest()

    const errors = await validate(plainToClass(LoginDTO, request.body))

    if (errors.length > 0) {
      throw new BadRequestException(errors.map((e) => Object.values(e.constraints || {})[0]))
    }

    return super.canActivate(context)
  }
}
