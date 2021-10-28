import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'

import { UsersService } from '../../users/users.service'
import { User } from '../../users/entities/user'
import { IUser } from '../../users/interfaces/user.interface'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly usersService: UsersService) {
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      signOptions: {
        expiresIn: configService.get<number>('JWT_ACCESS_TOKEN_DURATION_IN_MINUTES').toString() + 'm',
      },
    })
  }

  async validate(payload: any): Promise<User> {
    const { sub: id } = payload
    const user: IUser = await this.usersService.findOneById(id)
    if (!user) {
      return null
    }
    return { id: user.id, username: user.username }
  }
}

@Injectable()
export class JwtStrategyTest extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService, private readonly usersService: UsersService) {
    super(<StrategyOptions>{
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'JWT_SECRET',
      signOptions: {
        expiresIn: '10m',
      },
    })
  }

  async validate(payload: any): Promise<User> {
    const { sub: id } = payload
    const user: IUser = await this.usersService.findOneById(id)
    if (!user) {
      return null
    }
    return { id: user.id, username: user.username }
  }
}
