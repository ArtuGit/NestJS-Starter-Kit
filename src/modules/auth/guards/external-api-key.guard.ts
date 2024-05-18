import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common'

@Injectable()
export class ExternalApiKeyGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest()

    const externalApiKey = request.headers['x-external-api-key']

    if (!externalApiKey) throw new UnauthorizedException('Api key was not provided.')

    return true
  }
}
