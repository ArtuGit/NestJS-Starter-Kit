import { applyDecorators, HttpCode } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { ReturnMessage } from '../../../../utils'

export function LogoutUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Logout',
      description: 'Logout from the system',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiUnauthorizedResponse({
      description: 'Token is not valid',
    }),
    ApiCreatedResponse({
      description: 'Logout successfully',
      type: ReturnMessage,
    }),
  )
}
