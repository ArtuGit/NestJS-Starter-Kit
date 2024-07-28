import { applyDecorators } from '@nestjs/common'
import { ApiBody, ApiCreatedResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger'

import { ReturnMessage } from '../../../../utils'
import { SendRestorePasswordRequestDto } from '../../dto'

export function SendRestorePassword() {
  return applyDecorators(
    ApiOperation({
      summary: 'Send restore password email',
      description: 'Send restore password email',
    }),
    ApiBody({
      type: SendRestorePasswordRequestDto,
      description: 'Body to send restore password email',
    }),
    ApiCreatedResponse({
      description: 'The email massage restore password link has been successfully sent',
      type: ReturnMessage,
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
  )
}
