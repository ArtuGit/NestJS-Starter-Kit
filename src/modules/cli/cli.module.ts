import { Module } from '@nestjs/common'
import { ConsoleModule } from 'nestjs-console'
import { SeedJob } from './jobs'
import { JobService } from './jobService'

@Module({
  imports: [ConsoleModule],
  providers: [JobService, SeedJob],
})
export class CliModule {}
