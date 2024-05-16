import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { UsersService } from './users.service';
import * as UserDecorators from './decorators';
import {
  ChangeUserPasswordDTO,
  ChangeUserNamesDTO,
  CreateUserDTO,
  ResendActivationEmailDTO,
  SendChangeUserEmailMessageDTO,
  SendRestorePasswordDTO,
  SetRestoredPasswordDTO,
  UpdateSubUserDTO,
} from './dto';
import { User } from './users.entity';
import { AuthenticatedRequestType } from '../auth/types/types';
import { ReturnApiAccessKey, ReturnMessage } from '../../utils';
import { Public, Roles } from '../auth/decorators';
import { WinstonLogger } from '../../config';
import { RolesEnum } from './enums';
import { ValidateIdAsUUIDInParamDTO } from '../../utils/validation';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly logger: WinstonLogger,
  ) {}

  @Get('get-me')
  @UserDecorators.GetUser()
  async getProfile(
    @Req() req: AuthenticatedRequestType,
  ): Promise<Omit<User, 'password' | 'apiAccessKey'>> {
    const user = await this.usersService.findUserByID(req.user.id);

    return user.getPublicUser();
  }

  @Post('create')
  @Public()
  @UserDecorators.CreateUser()
  async createUser(
    @Body()
    input: CreateUserDTO,
  ): Promise<Omit<User, 'password' | 'apiAccessKey'>> {
    const user = await this.usersService.createUser(input);

    return user.getPublicUser();
  }

  @Post('activate/resend')
  @Public()
  @UserDecorators.ResendActivationEmail()
  async resendActivationEmail(
    @Query() query: ResendActivationEmailDTO,
  ): Promise<ReturnMessage> {
    const user = await this.usersService.findUserByEmail(query.email);

    if (user.isEmailConfirmed) {
      this.logger.error(`User with id: ${user.id} already activated.`);
      throw new BadRequestException('User already activated.');
    }

    return this.usersService.sendActivationEmail(user.id, user.email);
  }

  @Post('activate/:activateToken')
  @Public()
  @UserDecorators.ActivateUser()
  async activateUser(
    @Param('activateToken') activateToken: string,
    @Res() res: Response,
  ): Promise<void> {
    res.status(200).send(await this.usersService.activateUser(activateToken));
  }

  @Post('change-password')
  @UserDecorators.ChangeUserPassword()
  async changeUserPassword(
    @Req() req: AuthenticatedRequestType,
    @Res() res: Response,
    @Body()
    input: ChangeUserPasswordDTO,
  ): Promise<void> {
    const id = req.user['id'];

    res
      .status(200)
      .send(await this.usersService.changeUserPassword({ ...input, id }));
  }

  @Post('change-email/:changeToken')
  @Public()
  @UserDecorators.SetUserEmail()
  async setUserEmail(
    @Res() res: Response,
    @Param('changeToken') changeToken: string,
  ): Promise<void> {
    res.status(200).send(await this.usersService.setUserEmail(changeToken));
  }

  @Post('change-email')
  @UserDecorators.SendChangeUserEmailMessage()
  async sendChangeUserEmailMessage(
    @Req() req: AuthenticatedRequestType,
    @Body()
    input: SendChangeUserEmailMessageDTO,
  ): Promise<ReturnMessage> {
    return this.usersService.sendChangeUserEmailMessage({
      ...input,
      id: req.user.id,
    });
  }

  @Post('pass-restore/:changeToken')
  @Public()
  @UserDecorators.SetRestoredPassword()
  async setRestoredPassword(
    @Res() res: Response,
    @Param('changeToken') restoreToken: string,
    @Body() input: SetRestoredPasswordDTO,
  ): Promise<void> {
    res
      .status(200)
      .send(
        await this.usersService.setRestoredPassword({ ...input, restoreToken }),
      );
  }

  @Post('pass-restore')
  @Public()
  @UserDecorators.SendRestorePassword()
  async sendRestorePassword(
    @Body()
    input: SendRestorePasswordDTO,
  ): Promise<ReturnMessage> {
    return this.usersService.sendRestorePassword({
      ...input,
    });
  }

  @Post('change-names')
  @UserDecorators.ChangeUserNames()
  async changeUserNames(
    @Req() req: AuthenticatedRequestType,
    @Res() res: Response,
    @Body()
    input: ChangeUserNamesDTO,
  ): Promise<void> {
    res.status(200).send(
      await this.usersService.changeUserNames({
        ...input,
        id: req.user.id,
      }),
    );
  }
}
