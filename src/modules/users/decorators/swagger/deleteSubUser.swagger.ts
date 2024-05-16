import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { ReturnMessage } from '../../../../utils'

export function DeleteSubUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Delete Sub-User',
      description: `This route is provided to delete Sub-User. Only Primary User Accepted`,
    }),
    ApiBearerAuth('JWT-auth'),
    ApiParam({
      name: 'id',
      description: 'The ID of Sub-User',
      type: 'string',
      format: 'uuid',
    }),
    ApiOkResponse({
      description: 'The Seb-User has been successfully deleted.',
      type: ReturnMessage,
    }),
    ApiNotFoundResponse({
      description: 'User not found.; Sub-User not found.',
    }),
    ApiUnauthorizedResponse({ description: 'Token expired or not provided.' }),
  )
}
