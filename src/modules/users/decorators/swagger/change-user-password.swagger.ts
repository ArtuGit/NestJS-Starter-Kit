import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'

import { ChangeUserPasswordRequestDto } from '../../dto'
import { ReturnMessage } from '../../../../utils'

export function ChangeUserPassword() {
  return applyDecorators(
    ApiOperation({
      summary: 'Change User Password',
      description: 'Change User password',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiBody({
      type: ChangeUserPasswordRequestDto,
      description: 'Body to change User password',
    }),
    ApiOkResponse({
      description: 'The User password has been successfully changed',
      type: ReturnMessage,
    }),
    ApiBadRequestResponse({
      description: 'Passwords are the same, mismatch or wrong password',
    }),
    ApiNotFoundResponse({
      description: 'User not found',
    }),
  )
}
