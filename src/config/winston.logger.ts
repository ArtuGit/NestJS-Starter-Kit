import * as winston from 'winston'
import { WinstonModule, utilities as nestWinstonUtilities } from 'nest-winston'
import { envConfig } from './env.config'

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
