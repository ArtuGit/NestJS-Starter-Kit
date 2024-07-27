import { applyDecorators } from '@nestjs/common'
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
} from '@nestjs/swagger'
import * as moment from 'moment'

import { LoginReturnDTO } from '../../../auth/dto'
import { envConfig } from '../../../../config'

export function ActivateUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Activate User',
      description: `Activate User, there are ${moment
        .duration(envConfig.EMAIL_ACTIVATION_EXPIRES_IN * 1000)
        .asHours()} hours to activate user`,
    }),
    ApiParam({
      name: 'activateToken',
      description: 'The activate User token',
    }),
    ApiCreatedResponse({
      description: 'The User has been successfully activated',
      type: LoginReturnDTO,
    }),
    ApiNotFoundResponse({ description: 'User not found' }),
    ApiForbiddenResponse({
      description: 'Activate token expired, User already activated',
    }),
  )
}
