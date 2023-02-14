import { Controller, Get, Header } from '@nestjs/common'
import { ApiOperation } from '@nestjs/swagger'

import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get hello information' })
  @Get('hello')
  @Header('Content-Type', 'text/html; charset=utf-8')
  getHello(): string {
    return this.appService.getHello()
  }
}
