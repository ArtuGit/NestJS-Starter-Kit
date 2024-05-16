import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
} from '@nestjs/swagger'

import { CreateUserDTO } from '../../dto'
import { ReturnMessage } from '../../../../utils'

export function CreateSubUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Create Sub-User',
      description: 'This route is provided to create Sub-User, Only Primary User Accepted.',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiBody({
      type: CreateUserDTO,
      description: 'Body to create Sub-user.',
    }),
    ApiCreatedResponse({
      description: 'User Created.',
      type: ReturnMessage,
    }),
    ApiConflictResponse({ description: 'User exists.' }),
    ApiNotFoundResponse({ description: 'User not found.' }),
    ApiBadRequestResponse({ description: 'Email or password is not valid.' }),
  )
}
