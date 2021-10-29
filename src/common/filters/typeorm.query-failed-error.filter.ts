import { QueryFailedError } from 'typeorm'
import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common'
import { Request, Response } from 'express'

@Catch(QueryFailedError)
export class QueryFailedExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const context = host.switchToHttp()
    const response = context.getResponse<Response>()
    const request = context.getRequest<Request>()
    const { url } = request
    const { name, driverError } = exception
    const { code, errno } = driverError
    const errorResponse = {
      name,
      code,
      errno,
    }
    response.status(HttpStatus.BAD_REQUEST).json(errorResponse)
  }
}
