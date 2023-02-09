import { Logger, Injectable } from '@nestjs/common'

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name)

  async run(): Promise<void> {
    const jobName = process.argv[2]
    const params: string = process.argv[3]
    let parsedParams = {}
    if (params) {
      try {
        parsedParams = JSON.parse(params)
      } catch (err) {
        throw new Error(err)
      }
    }
    if (jobName) {
      const job = await import(`../../jobs/${jobName}`)
      this.logger.verbose(`Job '${jobName}' is started`)
      await job(this, parsedParams)
    } else {
      throw new Error('Job name is not specified as a parameter')
    }
    this.logger.verbose(`Job '${jobName}' is finished`)
  }
}
