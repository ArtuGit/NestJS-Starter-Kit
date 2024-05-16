import { ExtractJwt, Strategy } from 'passport-jwt'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'

import { envConfig } from '../../../config'
import { TokenPayloadType } from '../types/types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfig.JWT_SECRET,
    })
  }

  async validate(payload: TokenPayloadType) {
    return { ...payload, id: payload.id }
  }
}
