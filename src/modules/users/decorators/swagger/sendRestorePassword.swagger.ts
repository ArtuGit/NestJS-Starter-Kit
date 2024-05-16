import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger'

import { ReturnMessage } from '../../../../utils'
import { SendRestorePasswordDTO } from '../../dto'

export function SendRestorePassword() {
  return applyDecorators(
    ApiOperation({
      summary: 'Send restore password email.',
      description: 'This route is provided to send restore password email.',
    }),
    ApiBody({
      type: SendRestorePasswordDTO,
      description: 'Body to send restore password email.',
    }),
    ApiCreatedResponse({
      description: 'The email massage restore password link has been successfully sent.',
      type: ReturnMessage,
    }),
    ApiNotFoundResponse({ description: 'User not found.' }),
  )
}
