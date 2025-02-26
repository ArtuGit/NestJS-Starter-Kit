import { applyDecorators } from '@nestjs/common'
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation } from '@nestjs/swagger'
import { GroupDto } from '../../dto'

export function GetGroup() {
  return applyDecorators(
    ApiOperation({
      summary: 'Get group by Id',
      description: 'Retrieve a single group by its Id',
    }),
    ApiOkResponse({
      description: 'Group found successfully',
      type: GroupDto,
    }),
    ApiNotFoundResponse({
      description: 'Group not found',
    })
  )
} 