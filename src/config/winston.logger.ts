import { Injectable } from '@nestjs/common'
import { transports, createLogger, format, Logger } from 'winston'

const errorStackTracerFormat = format((info) => {
  if (info.stack) {
    info.message = `${info.message}\n> ${info.stack}`
    delete info.stack
  }
  return info
})

@Injectable()
export class WinstonLogger {
  private logger: Logger

  constructor() {
    this.logger = createLogger({
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
      transports: [
        new transports.Console({
          format: format.combine(errorStackTracerFormat(), format.colorize(), format.simple()),
        }),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' }),
      ],
    })
  }

  log(message: string) {
    this.logger.log('info', message)
  }

  error(message: string) {
    this.logger.error(message)
  }
}
