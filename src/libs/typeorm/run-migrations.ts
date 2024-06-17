import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { typeOrmConfig } from '../../config'

const logger = new Logger('Seed')

export const runMigrations = async () => {
  const dataSource = new DataSource(typeOrmConfig)

  logger.log('Migration is starting')

  try {
    await dataSource.initialize()
    await dataSource.runMigrations()
    await dataSource.destroy()
  } catch (error) {
    logger.error(JSON.stringify(error))
    // eslint-disable-next-line no-console
    console.log(error)
    process.exit()
  }

  logger.log('Migration is successful!')
}
