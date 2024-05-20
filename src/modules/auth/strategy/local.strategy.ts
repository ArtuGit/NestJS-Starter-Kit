import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common'

import { AuthService } from '../auth.service'
import { LoginDTO } from '../dto/login.dto'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser({
      email,
      password,
    } as LoginDTO)
    if (!user) {
      throw new UnauthorizedException()
    } else if (!user.isEmailConfirmed) throw new ForbiddenException('Please confirm your email!')
    return user
  }
}
