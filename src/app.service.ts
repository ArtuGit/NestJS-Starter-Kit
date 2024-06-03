import { Injectable } from '@nestjs/common'
import {
  DiskHealthIndicator,
  HealthCheckResult,
  HealthCheckService,
  MemoryHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus'
import * as packageJson from '../package.json'
import { AppHealthCheckResponseDto } from './app.healthcheck.response.dto'

@Injectable()
export class AppService {
  constructor(
    private readonly health: HealthCheckService,
    private readonly db: TypeOrmHealthIndicator,
    private readonly disk: DiskHealthIndicator,
    private readonly memory: MemoryHealthIndicator,
  ) {}

  healthCheck(): Promise<AppHealthCheckResponseDto> {
    return this.health
      .check([
        () => this.db.pingCheck('database'),
        () => this.disk.checkStorage('storage', { path: '/', thresholdPercent: 5 }),
        () => this.memory.checkHeap('memory_heap', 1024 * 1024 * 1024),
      ])
      .then(
        (healthCheckResult: HealthCheckResult) => ({
          name: packageJson.name,
          version: packageJson.version,
          health: healthCheckResult,
        }),
        (healthCheckResult: HealthCheckResult) => ({
          name: packageJson.name,
          version: packageJson.version,
          health: healthCheckResult,
        }),
      )
  }
}
