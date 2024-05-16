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

    if (
      envConfig.ERROR_LOGGING_DISCORD_WEBHOOK &&
      (status < 200 || status === 400 || status === 402 || status === 403 || status >= 405)
    ) {
      const currentDate = new Date()
      const data = {
        content: `Hi, an error occurred on ${envConfig.BACKEND_HOST}, on ${currentDate}`,
        tts: false,
        embeds: [
          {
            title: `On ${JSON.stringify(path)}`,
            color: 2326507,
            fields: [
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
          },
        ],
        components: [],
        actions: {},
      }

      axios.post(envConfig.ERROR_LOGGING_DISCORD_WEBHOOK, data).catch((err) => {
        this.logger.error(`Failed to send webhook error on Discord. Cause ${err}`)
      })
    }

    response.status(status).json(errorResponce)
  }
}
