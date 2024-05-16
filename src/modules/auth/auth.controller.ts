import { Controller, Post, UseGuards, Req, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { AuthService } from './auth.service'
import { AuthenticatedRequestType } from './types/types'
import * as AuthDecorators from './decorators'
import { Public } from './decorators'
import { LoginReturnDTO } from './dto'
import { LocalAuthGuard, RefreshTokenGuard } from './guards'
import { ReturnMessage } from '../../utils'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @AuthDecorators.LoginUser()
  async login(@Req() req: AuthenticatedRequestType): Promise<LoginReturnDTO> {
    return await this.authService.login(req.user)
  }

  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  @AuthDecorators.RefreshToken()
  refreshToken(@Req() req: any) {
    const userId = req.user['id']
    const refreshToken = req.user['refreshToken']

    return this.authService.refreshToken(userId, refreshToken)
  }

  @Post('logout')
  @AuthDecorators.LogoutUser()
  logout(@Req() req: AuthenticatedRequestType): Promise<ReturnMessage> {
    const refreshTokenId = req.user.session

    return this.authService.logout(refreshTokenId)
  }
}
