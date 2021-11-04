import {
  BadRequestException,
  Body,
  Controller,
  Delete,
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

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { User as UserLoggedIn } from '../auth/decorators/user.decorator'
import { TokensService } from '../auth/tokens.service'
import { User, UserPublic } from '../users/entities/user.entity'
import { UsersService } from '../users/users.service'
import { IUserPublic } from '../users/interfaces/user.interface'
import { QueryFailedExceptionFilter } from '../common/filters/typeorm.query-failed-error.filter'

import { AuthenticatedResponse } from './dto/authenticated.response'
import { LoginBody, LoginResponse, RefreshBody, RegisterBody } from './dto'

@ApiTags('Authentication')
@UseFilters(QueryFailedExceptionFilter)
@Controller({
  path: 'auth',
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
  @Post('/register')
  public async register(@Body() body: RegisterBody): Promise<AuthenticatedResponse> {
    const user = await this.usersService.register(body)
    const refreshTokenResult = await this.tokensService.generateRefreshToken(
      user,
      this.configService.get<number>('JWT_REFRESH_TOKEN_DURATION_IN_MINUTES'),
    )
    const token = await this.tokensService.generateAccessToken(user, refreshTokenResult.id)
    return AuthenticationController.buildResponsePayload(user, token, refreshTokenResult.token)
  }

  @ApiOkResponse({ type: LoginResponse })
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

  @ApiOkResponse({ type: LoginResponse })
  @Post('/refresh')
  public async refresh(@Body() body: RefreshBody) {
    const { user, token } = await this.tokensService.createAccessTokenFromRefreshToken(body.refreshToken)

    return AuthenticationController.buildResponsePayload(user, token)
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: User })
  @Get('me')
  me(@UserLoggedIn() user: any): User {
    return user
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('logout')
  async logout(@Headers('Authorization') auth: string): Promise<void> {
    const jwt = auth.replace('Bearer ', '')
    await this.tokensService.revokeAccessToken(jwt)
  }
}
