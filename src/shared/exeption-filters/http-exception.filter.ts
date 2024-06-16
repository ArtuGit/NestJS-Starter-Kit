import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common'
import { Response } from 'express'
import { Logger } from '@nestjs/common'

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name)

  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const { path, method, params, query, user, body } = ctx.getRequest()
    const status = exception.getStatus()
    const errorResponse = exception.getResponse()

    const data = {
      path,
      status,
      method,
      params,
      query,
      body,
      user,
      errorResponse,
    }

    this.logger.error(`${JSON.stringify(data, null, 2)}`)

    response.status(status).json(errorResponse)
  }
}
