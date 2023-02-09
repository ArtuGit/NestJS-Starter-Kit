import { NestFactory } from '@nestjs/core'

import { JobsModule } from './modules/jobs/jobs.module'

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(JobsModule)
  const { JobsService } = await import('./modules/jobs/jobs.service')
  const jobsService = app.get(JobsService)

  await jobsService.run()

  await app.close()
}
bootstrap()
