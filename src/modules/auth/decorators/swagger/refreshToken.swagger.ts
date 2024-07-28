import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger'

import { LoginReturnDTO } from '../../dto'

export function RefreshToken() {
  return applyDecorators(
    ApiOperation({
      summary: 'Update tokens',
      description: 'Update tokens. Please provide refreshToken in Bearer token.',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiForbiddenResponse({
      description: 'Token is not valid',
    }),
    ApiOkResponse({
      description: 'Tokens generated in successfully',
      type: LoginReturnDTO,
    }),
  )
}
