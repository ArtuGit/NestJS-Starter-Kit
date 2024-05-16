import { applyDecorators } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { User } from '../../users.entity'

export function GetSubUsers() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get Sub-Users',
      description: 'This route is provided to get Sub-Users. Only Primary User Accepted.',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiOkResponse({
      description: 'Get Sub-Users.',
      type: [User],
    }),
  )
}
