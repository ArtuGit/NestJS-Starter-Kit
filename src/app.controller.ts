import { Controller, Get } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AppHealthcheckResultDto } from 'src/modules/app.healthcheck.result.dto'
import * as packageJson from '../package.json'

@ApiTags('Api')
@Controller()
export class AppController {
  constructor() {}

  @Get()
  healthCheck(): AppHealthcheckResultDto {
    return {
      name: packageJson.name,
      version: packageJson.version,
      healthy: true,
    }
  }
}
