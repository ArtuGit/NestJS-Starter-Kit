import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'

import { ReturnMessage } from '../../../../utils'
import { SetRestoredPasswordRequestDto } from '../../dto'

export function SetRestoredPassword() {
  return applyDecorators(
    ApiOperation({
      summary: 'Change User password',
      description: 'Change user password, if change token expired change password email can be sent again',
    }),
    ApiParam({ name: 'changeToken', description: 'The change password token' }),
    ApiBody({
      type: SetRestoredPasswordRequestDto,
      description: 'Body to restore password',
    }),
    ApiOkResponse({
      description: 'The password has been successfully changed',
      type: ReturnMessage,
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiBadRequestResponse({ description: 'Passwords mismatch' }),
    ApiForbiddenResponse({ description: 'Change token expired' }),
  )
}
