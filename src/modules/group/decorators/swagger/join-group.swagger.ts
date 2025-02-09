import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { GroupDto } from '../../dto'

export function JoinGroup() {
  return applyDecorators(
    ApiOperation({
      summary: 'Join group',
      description: 'Add current user to group members',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiCreatedResponse({
      description: 'Successfully joined the group',
      type: GroupDto,
    }),
    ApiNotFoundResponse({ description: 'Group not found' }),
    ApiForbiddenResponse({ description: 'Forbidden resource' }),
  )
}
