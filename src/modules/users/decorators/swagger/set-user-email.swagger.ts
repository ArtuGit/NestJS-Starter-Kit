import { applyDecorators } from '@nestjs/common'
import { ApiForbiddenResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger'

import { ReturnMessage } from '../../../../utils'

export function SetUserEmail() {
  return applyDecorators(
    ApiOperation({
      summary: 'Set User email',
      description: 'Change user email, if change token expired it is needed to change email again',
    }),
    ApiParam({ name: 'changeToken', description: 'The change email token' }),
    ApiOkResponse({
      description: 'The email massage with change email link has been successfully sent',
      type: ReturnMessage,
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiForbiddenResponse({ description: 'Change token expired' }),
  )
}
