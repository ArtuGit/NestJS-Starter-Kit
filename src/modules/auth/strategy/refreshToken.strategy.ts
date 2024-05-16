import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { Request } from 'express'
import { Injectable } from '@nestjs/common'
import { envConfig } from '../../../config'
import { TokenPayloadType } from '../types/types'

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: envConfig.JWT_REFRESH_SECRET,
      ignoreExpiration: true,
      passReqToCallback: true,
    })
  }

  validate(req: Request, payload: TokenPayloadType) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim()
    return { ...payload, refreshToken }
  }
}
