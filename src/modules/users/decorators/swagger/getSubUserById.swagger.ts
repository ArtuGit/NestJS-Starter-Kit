import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger'
import { User } from '../../users.entity'

export function GetSubUserById() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Sub-User By Id',
      description: 'This route is provided to get Sub-User. Only Primary User Accepted.',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiParam({
      name: 'id',
      description: 'The ID of Sub-User',
      type: 'string',
      format: 'uuid',
    }),
    ApiOkResponse({
      description: 'Get Sub-User.',
      type: User,
    }),
    ApiNotFoundResponse({ description: 'User not found.' }),
  )
}
