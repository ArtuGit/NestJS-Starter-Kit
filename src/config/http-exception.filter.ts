import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Injectable } from '@nestjs/common'
import { Response } from 'express'
import axios from 'axios'
import { envConfig } from './env.config'
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
    const errorResponce = exception.getResponse()

    const formatJson = (object: any): string => JSON.stringify(object, null, 4)

    const currentDate = new Date()

    const data = {
      fields: [
        {
          name: 'PATH:',
          value: path,
        },
        {
          name: 'STATUS:',
          value: status,
        },
        {
          name: 'METHOD:',
          value: method,
        },
        {
          name: 'PARAMS:',
          value: formatJson(params),
        },
        {
          name: 'QUERY:',
          value: formatJson(query),
        },
        {
          name: 'BODY:',
          value: formatJson(body),
        },
        {
          name: 'USER:',
          value: formatJson(user),
        },
        {
          name: 'ERROR:',
          value: formatJson(errorResponce),
        },
      ],
    }

    this.logger.error(`Error on path: ${data}`)

    response.status(status).json(errorResponce)
  }
}
