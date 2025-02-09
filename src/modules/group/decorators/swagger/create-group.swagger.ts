import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOperation,
} from '@nestjs/swagger'
import { GroupDto } from '../../dto'

export function CreateGroup() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create new group',
      description: 'Create new group. Only for Site Admins',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiCreatedResponse({
      description: 'The group has been successfully created',
      type: GroupDto,
    }),
    ApiForbiddenResponse({ description: 'Forbidden resource' }),
  )
} 