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
import { ChangeUserDataRequestDto } from '../../dto'

export function ChangeUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Set User data',
      description: 'Change user data',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiBody({
      type: ChangeUserDataRequestDto,
    }),
    ApiOkResponse({
      type: ReturnMessage,
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
  )
}
