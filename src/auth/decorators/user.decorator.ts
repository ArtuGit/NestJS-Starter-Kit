import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common'

export const User = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  console.log('jwt', request.user)
  if (!request.user) {
    throw new UnauthorizedException('User not found in request')
  }

  return request.user
})

export const UserId = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  if (!request.user) {
    throw new UnauthorizedException('User not found in request')
  }

  return request.user.id
})
