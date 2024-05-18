import { Controller, Get } from '@nestjs/common'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { AppHealthcheckResultDto } from 'src/app.healthcheck.result.dto'
import { Public } from 'src/modules/auth/decorators'
import * as packageJson from '../package.json'

@ApiTags('Api')
@Controller()
export class AppController {
  constructor() {}

  @Public()
  @Get('/healthcheck')
  @ApiOperation({
    summary: 'Health check endpoint, respond with app name, version and health status',
  })
  @ApiResponse({
    status: 200,
    description: 'App name and version and health status',
    type: AppHealthcheckResultDto,
  })
  healthCheck(): AppHealthcheckResultDto {
    return {
      name: packageJson.name,
      version: packageJson.version,
      healthy: true,
    }
  }
}
