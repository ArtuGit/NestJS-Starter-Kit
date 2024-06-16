import { Injectable } from '@nestjs/common'
import { transports, createLogger, format, Logger } from 'winston'
import * as winston from 'winston'
import { WinstonModule, utilities as nestWinstonUtilities } from 'nest-winston'
import { envConfig } from './env.config'

// const errorStackTracerFormat = format((info) => {
//   if (info.stack) {
//     info.message = `${info.message}\n> ${info.stack}`
//     delete info.stack
//   }
//   return info
// })
//
// @Injectable()
// export class WinstonLogger {
//   private logger: Logger
//
//   constructor() {
//     this.logger = createLogger({
//       level: 'info',
//       format: format.combine(format.timestamp(), format.json()),
//       transports: [
//         new transports.Console({
//           format: format.combine(errorStackTracerFormat(), format.colorize(), format.simple()),
//         }),
//         new transports.File({ filename: 'error.log', level: 'error' }),
//         new transports.File({ filename: 'combined.log' }),
//       ],
//     })
//   }
//
//   log(message: string) {
//     this.logger.log('info', message)
//   }
//
//   error(message: string) {
//     this.logger.error(message)
//   }
// }

export const getWinstonLoggerModule = () => {
  const level = envConfig.LOGGING_LEVEL
  const transports: winston.transport[] = [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.timestamp(), nestWinstonUtilities.format.nestLike()),
      stderrLevels: ['error'],
    }),
  ]

  if (!envConfig.LOGGING_FILE_LOG) {
    transports.push(
      new winston.transports.File({
        filename: envConfig.LOGGING_FILE_NAME,
        format: winston.format.combine(winston.format.timestamp(), winston.format.splat()),
      }),
    )
    transports.push(
      new winston.transports.File({
        filename: 'error.log',
        level: 'error',
        format: winston.format.combine(winston.format.timestamp(), winston.format.splat()),
      }),
    )
  }

  return WinstonModule.createLogger({
    level,
    transports,
  })
}
