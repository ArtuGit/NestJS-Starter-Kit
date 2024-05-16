import { applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'

import { ReturnApiAccessKey } from '../../../../utils'

export function RegenerateApiAccessKey() {
  return applyDecorators(
    ApiOperation({
      summary: 'Regenerate my api access key',
      description: 'This route requires a Bearer token for authorization.',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiOkResponse({
      description: 'Access key regenerated successfully.',
      type: ReturnApiAccessKey,
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiNotFoundResponse({ description: 'User not found.' }),
  )
}
