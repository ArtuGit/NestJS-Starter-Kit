import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
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
      description:
        'This route is provided to resend activation email, you have 15 mins to activate user, or you need to send email again',
    }),
    ApiCreatedResponse({
      description: 'New activation email was successfully sent',
      type: ReturnMessage,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiBadRequestResponse({
      description: 'User already activated',
    }),
    ApiNotFoundResponse({ description: 'User not found.' }),
  )
}
