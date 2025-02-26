import { Body, Controller, Get, Param, Post, Query, Req } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { GroupService } from './group.service'
import { CreateGroupRequestDto, GroupDto } from './dto'
import { Roles, Public } from '../auth/decorators'
import { RolesEnum } from '../../shared'
import { AuthenticatedRequestType } from '../auth/types/types'
import * as GroupDecorators from './decorators/swagger'
import { PageDTO, PaginationDTO } from '../../shared'
import { SortDTO } from '../../shared/dto/sort.dto'

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

  @Post(':id/join')
  @Roles([RolesEnum.USER])
  @GroupDecorators.JoinGroup()
  async joinGroup(@Param('id') groupId: string, @Req() req: AuthenticatedRequestType): Promise<GroupDto> {
    return this.groupService.joinGroup(groupId, req.user.id)
  }

  @Get()
  @Public()
  @GroupDecorators.GetGroups(GroupDto)
  async getGroups(
    @Query() pagination: PaginationDTO,
    @Query() sort: SortDTO,
    @Query('search') search: string,
  ): Promise<PageDTO<GroupDto>> {
    return this.groupService.findGroups({
      pagination,
      sort,
      search,
    })
  }

  @Get(':id')
  @Public()
  @GroupDecorators.GetGroup()
  async getGroupById(@Param('id') id: string): Promise<GroupDto> {
    return this.groupService.findGroupById(id)
  }
}
