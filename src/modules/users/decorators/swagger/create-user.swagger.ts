import { applyDecorators } from '@nestjs/common'
import { ApiBadRequestResponse, ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger'

import { User } from '../../users.entity'
import { CreateUserRequestDto } from '../../dto'

export function RegisterUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Register User',
      description:
        'Register a new user, it will send a confirmation email, you will have 15 mins to confirm your email',
    }),
    ApiBody({
      type: CreateUserRequestDto,
      description: 'Body sign In',
    }),
    ApiCreatedResponse({
      description: 'The new User has been successfully created, confirmation email sent',
      type: User,
    }),
    ApiConflictResponse({ description: 'The User already exists' }),
    ApiBadRequestResponse({ description: 'Email or password is not valid' }),
  )
}
