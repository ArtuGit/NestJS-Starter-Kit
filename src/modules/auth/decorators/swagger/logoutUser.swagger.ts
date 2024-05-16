import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiUnauthorizedResponse } from '@nestjs/swagger'
import { ReturnMessage } from '../../../../utils'

export function LogoutUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Logout',
      description: 'This route is provided to logout from the system.',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiUnauthorizedResponse({
      description: 'Token is not valid',
    }),
    ApiOkResponse({
      description: 'logout in successfully.',
      type: ReturnMessage,
    }),
  )
}
