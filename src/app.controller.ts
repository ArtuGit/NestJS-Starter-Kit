import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AppHealthCheckResponseDto } from './app.healthcheck.response.dto'
import { AppService } from './app.service'
import { Public } from './modules/auth/decorators'

@ApiTags('Api')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get('/healthcheck')
  @ApiOperation({
    summary: 'Health check endpoint, respond with app name, version and health status',
  })
  @ApiResponse({
    status: 200,
    description: 'App name and version and health status',
    type: AppHealthCheckResponseDto,
  })
  healthCheck(): Promise<AppHealthCheckResponseDto> {
    return this.appService.healthCheck()
  }
}
