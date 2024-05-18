import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { User } from '../../users.entity'

export function GetUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get my user',
      description: 'This route requires a Bearer token for authorization.',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiOkResponse({
      description: 'The User profile successfully received.',
      type: User,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiNotFoundResponse({ description: 'User not found.' }),
  )
}
