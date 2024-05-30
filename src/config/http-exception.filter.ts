import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common'
import { Response } from 'express'
import { WinstonLogger } from './winston.logger'

@Catch(HttpException)
@Injectable()
export class HttpExceptionFilter implements ExceptionFilter {
  logger = new WinstonLogger()

  constructor() {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const { path, method, params, query, user, body } = ctx.getRequest()
    const status = exception.getStatus()
    const errorResponse = exception.getResponse()

    const currentDate = new Date()

    const data = {
      currentDate,
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
