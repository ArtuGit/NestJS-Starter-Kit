import { applyDecorators } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger'
import { LoginDTO, LoginReturnDTO } from '../../dto'

export function LoginUser() {
  return applyDecorators(
    ApiOperation({
      summary: 'Login',
      description: 'This route is provided to login in the system.',
    }),
    ApiBody({
      type: LoginDTO,
      description: 'Body sign In.',
    }),
    ApiUnauthorizedResponse({
      description: 'Login or password are incorrect',
    }),
    ApiNotFoundResponse({ description: 'The User does not exist.' }),
    ApiBadRequestResponse({
      description: 'Email or password is not valid.',
    }),
    ApiCreatedResponse({
      description: 'Logged in successfully.',
      type: LoginReturnDTO,
    }),
  )
}
