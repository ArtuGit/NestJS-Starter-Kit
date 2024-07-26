import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
} from '@nestjs/swagger'

import { ReturnMessage } from '../../../../utils'
import { SendChangeUserEmailMessageDto } from '../../dto'

export function SendChangeUserEmailMessage() {
  return applyDecorators(
    ApiOperation({
      summary: 'Change User email',
      description:
        'This route is provided to change user email, it will send a message on your old email, you will have 15 mins to change it, or you need to change email again',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiBody({
      type: SendChangeUserEmailMessageDto,
      description: 'Body to change User email',
    }),
    ApiCreatedResponse({
      description: 'The email massage with change email link has been successfully sent',
      type: ReturnMessage,
    }),
    ApiConflictResponse({ description: 'Email is already taken' }),
    ApiBadRequestResponse({ description: 'Invalid password' }),
    ApiNotFoundResponse({ description: 'User not found' }),
  )
}
