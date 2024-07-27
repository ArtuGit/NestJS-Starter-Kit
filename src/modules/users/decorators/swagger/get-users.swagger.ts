import { Type, applyDecorators } from '@nestjs/common'
import {
  ApiBearerAuth,
  ApiExtraModels,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger'
import { PageDTO } from '../../../../shared'

export function GetUsers<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get users',
      description: 'Only for admin users. Get users list with pagination and search',
    }),
    ApiBearerAuth('JWT-auth'),
    ApiExtraModels(PageDTO, model),
    ApiQuery({
      name: 'search',
      description: 'Search users by email, username, or full name',
      type: 'string',
      required: false,
    }),
    ApiOkResponse({
      description: 'Successfully received users list',
      schema: {
        allOf: [
          { $ref: getSchemaPath(PageDTO) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(model) },
              },
            },
          },
        ],
      },
    }),
    ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    ApiForbiddenResponse({
      description: 'Forbidden resource',
    }),
  )
}
