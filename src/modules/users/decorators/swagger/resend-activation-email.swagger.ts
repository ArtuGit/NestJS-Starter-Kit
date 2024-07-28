import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { ReturnMessage } from '../../../../utils'

export function ResendActivationEmail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Resend Activation Email',
      description: 'Resend activation email, there are 15 mins to activate user, or the email can be changed again',
    }),
    ApiCreatedResponse({
      description: 'New activation email was successfully sent',
      type: ReturnMessage,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBadRequestResponse({
      description: 'User already activated',
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
  )
}
