import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger(`HTTP`)

  use(req: Request, res: Response, next: NextFunction) {
    const request = {
      headers: req.headers,
      body: req.body,
      method: req.method,
      originalUrl: req.originalUrl,
      statusCode: res.statusCode,
    }
    this.logger.verbose(`Logging HTTP request ${JSON.stringify(request)}`)
    next()
  }
}
