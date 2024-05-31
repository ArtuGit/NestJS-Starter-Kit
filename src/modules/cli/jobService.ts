import { Console, Command, CommandOption } from 'nestjs-console'
import { Job, SeedJob } from './jobs'

@Console()
export class JobService {
  constructor(private seedJob: SeedJob) {}

  @Command({
    command: 'job <jobName>',
    options: [
      {
        flags: '-a, --args <jsonValue>',
        required: false,
      },
    ],
    description: 'Run a job',
  })
  async runJob(jobName: string, options: CommandOption): Promise<void> {
    let job: Job
    if (jobName === 'seed') {
      job = this.seedJob
    } else {
      console.error(`Job "${jobName}" not found.`)
    }

    console.log(`Running job "${jobName}"`)
    try {
      await job.run()
    } catch (error) {
      console.error(`Job "${jobName}" failed: ${error.message}`)
    }
    console.log(`Job "${jobName}" completed`)
  }
}
