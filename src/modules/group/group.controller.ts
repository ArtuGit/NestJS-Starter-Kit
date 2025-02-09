import { Body, Controller, Param, Post, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GroupService } from './group.service'
import { CreateGroupRequestDto, GroupDto } from './dto'
import { Roles } from '../auth/decorators'
import { RolesEnum } from '../../shared'
import { AuthenticatedRequestType } from '../auth/types/types'
import * as GroupDecorators from './decorators/swagger'

@ApiTags('Groups')
@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @Roles([RolesEnum.SITE_ADMIN])
  @GroupDecorators.CreateGroup()
  async createGroup(@Body() input: CreateGroupRequestDto, @Req() req: AuthenticatedRequestType): Promise<GroupDto> {
    return this.groupService.createGroup(input, req.user.id)
  }

  @Post(':groupId/join')
  @Roles([RolesEnum.USER])
  @GroupDecorators.AddMeToGroup()
  async addMeToGroup(
    @Param('groupId') groupId: string,
    @Req() req: AuthenticatedRequestType,
  ): Promise<GroupDto> {
    return this.groupService.addUserToGroup(groupId, req.user.id)
  }
} 