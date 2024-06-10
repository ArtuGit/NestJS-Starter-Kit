import { Logger } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { typeOrmConfig, WinstonLogger } from '../../config'

const logger = new Logger('Seed')

export const runMigrations = async () => {
  const dataSource = new DataSource(typeOrmConfig)

  logger.log('Migration starts')

  try {
    await dataSource.initialize()
    await dataSource.runMigrations()
    await dataSource.destroy()
  } catch (error) {
    logger.error(JSON.stringify(error))
    console.log(error)
    process.exit()
  }

  logger.log('Migration successful!')
}
