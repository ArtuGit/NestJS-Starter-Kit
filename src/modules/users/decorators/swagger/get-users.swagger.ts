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
import { PageDTO } from 'src/shared'

export function GetUsers<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get users',
      description: 'This route requires a Bearer token for authorization. (Only SITE ADMIN allowed)',
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
      description: 'Forbidden resource.',
    }),
  )
}
