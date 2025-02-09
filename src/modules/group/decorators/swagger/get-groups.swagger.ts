import { Type, applyDecorators } from '@nestjs/common'
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  getSchemaPath,
} from '@nestjs/swagger'
import { PageDTO } from '../../../../shared'

export function GetGroups<TModel extends Type<any>>(model: TModel) {
  return applyDecorators(
    ApiOperation({
      summary: 'Get groups',
      description: 'Get groups list with pagination and search',
    }),
    ApiExtraModels(PageDTO, model),
    ApiQuery({
      name: 'search',
      description: 'Search groups by name or description',
      type: 'string',
      required: false,
    }),
    ApiOkResponse({
      description: 'Successfully received groups list',
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
  )
} 