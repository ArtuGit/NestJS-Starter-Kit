import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { ReturnMessage } from '../../../../utils'
import { ChangeUserNamesRequestDto } from '../../dto'

export function ChangeUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Set User names',
      description: 'This route is provided to change user names',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiBody({
      type: ChangeUserNamesRequestDto,
      description: 'Body to change user names',
    }),
    ApiOkResponse({
      description: 'Names changed',
      type: ReturnMessage,
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiUnauthorizedResponse({ description: 'Token expired or not provided' }),
  )
}
