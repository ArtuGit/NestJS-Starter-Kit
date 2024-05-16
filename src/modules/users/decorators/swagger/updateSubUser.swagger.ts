import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'

import { UpdateSubUserDTO } from '../../dto'
import { ReturnMessage } from '../../../../utils'

export function UpdateSubUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update Sub-User',
      description: 'This route is provided to update Sub-User Only Primary User Accepted.',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiParam({
      name: 'id',
      description: 'The ID of Sub-User',
      type: 'string',
      format: 'uuid',
    }),
    ApiBody({
      type: UpdateSubUserDTO,
      description: 'Body to update Sub-user.',
    }),
    ApiOkResponse({
      description: 'User Updated.',
      type: ReturnMessage,
    }),
    ApiConflictResponse({ description: 'The User already exists.' }),
    ApiBadRequestResponse({ description: 'Email or password is not valid.' }),
  )
}
