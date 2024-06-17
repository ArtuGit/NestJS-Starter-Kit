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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async runJob(jobName: string, options: CommandOption): Promise<void> {
    let job: Job
    if (jobName === 'seed') {
      job = this.seedJob
    } else {
      // eslint-disable-next-line no-console
      console.error(`Job "${jobName}" not found.`)
    }
    // eslint-disable-next-line no-console
    console.log(`Running job "${jobName}"`)
    try {
      await job.run()
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`Job "${jobName}" failed: ${error}`)
      throw error
    }
    // eslint-disable-next-line no-console
    console.log(`Job "${jobName}" completed`)
  }
}
