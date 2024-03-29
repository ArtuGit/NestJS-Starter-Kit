import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseFilters,
  UseGuards,
  Headers,
} from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { ConfigService } from '@nestjs/config'
import { AuthGuard } from 'src/common/roles/roles.decorators'
import { Role } from 'src/common/roles/role.enum'

import { User, UserPublic } from '../../entities/user.entity'
import { UsersService } from '../../users.service'
import { IUserPublic } from '../../interfaces/user.interface'
import { QueryFailedExceptionFilter } from '../../../../common/filters/typeorm.query-failed-error.filter'

import { TokensService } from './tokens.service'
import { User as UserLoggedIn } from './decorators/user.decorator'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { AuthenticatedResponse } from './dto/authenticated.response'
import { LoginBody, LoginResponse, RefreshBody, RegisterBody } from './dto'

@ApiTags('Users')
@UseFilters(QueryFailedExceptionFilter)
@Controller({
  version: '1',
})
export class AuthenticationController {
  constructor(
    private readonly configService: ConfigService,
    private readonly tokensService: TokensService,
    private readonly usersService: UsersService,
  ) {}

  private static buildResponsePayload(
    user: UserPublic,
    accessToken: string,
    refreshToken?: string,
  ): AuthenticatedResponse {
    return {
      user: user,
      payload: {
        type: 'bearer',
        token: accessToken,
        ...(refreshToken ? { refresh_token: refreshToken } : {}),
      },
    }
  }

  @ApiOkResponse({ type: AuthenticatedResponse })
  @Post('register')
  public async register(@Body() body: RegisterBody): Promise<AuthenticatedResponse> {
    const user = await this.usersService.register(body)
    const refreshTokenResult = await this.tokensService.generateRefreshToken(
      user,
      this.configService.get<number>('JWT_REFRESH_TOKEN_DURATION_IN_MINUTES'),
    )
    const token = await this.tokensService.generateAccessToken(user, refreshTokenResult.id)
    return AuthenticationController.buildResponsePayload(user, token, refreshTokenResult.token)
  }

  @ApiOkResponse({ type: AuthenticatedResponse })
  @Post('login')
  async login(@Body() { username, password }: LoginBody): Promise<AuthenticatedResponse> {
    if (!username || !password) throw new BadRequestException()

    let user: IUserPublic = null

    user = await this.usersService.validateCredentials(username, password)

    if (!user) {
      throw new BadRequestException()
    }

    const refreshTokenResult = await this.tokensService.generateRefreshToken(
      user,
      this.configService.get<number>('JWT_REFRESH_TOKEN_DURATION_IN_MINUTES'),
    )
    const token = await this.tokensService.generateAccessToken(user, refreshTokenResult.id)

    return AuthenticationController.buildResponsePayload(user, token, refreshTokenResult.token)
  }

  @ApiOkResponse({ type: AuthenticatedResponse })
  @Post('refresh')
  public async refresh(@Body() body: RefreshBody): Promise<AuthenticatedResponse> {
    const { user, token } = await this.tokensService.createAccessTokenFromRefreshToken(body.refreshToken)

    return AuthenticationController.buildResponsePayload(user, token)
  }

  @AuthGuard([Role.Admin, Role.User])
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @Get('me')
  me(@UserLoggedIn() user: any): User {
    return user
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  async logout(@Headers('') auth: string): Promise<void> {
    const jwt = auth.replace('Bearer ', '')
    await this.tokensService.revokeAccessToken(jwt)
  }
}
