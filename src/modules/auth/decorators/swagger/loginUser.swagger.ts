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
      description: 'Login in the system',
    }),
    ApiBody({
      type: LoginDTO,
      description: 'Body login',
    }),
    ApiUnauthorizedResponse({
      description: 'Login or password are incorrect',
    }),
    ApiNotFoundResponse({ description: 'The User does not exist' }),
    ApiBadRequestResponse({
      description: 'Email or password is not valid',
    }),
    ApiCreatedResponse({
      description: 'Logged in successfully',
      type: LoginReturnDTO,
    }),
  )
}
