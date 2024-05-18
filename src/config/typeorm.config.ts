import { TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
import * as path from 'path'
import * as crypto from 'crypto'

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { envConfig } from './env.config'
import { WinstonLogger } from './winston.logger'
import { RolesEnum } from '../shared'

const logger = new WinstonLogger()

const migrationsFolder = path.join(__dirname, '..', 'migrations', '**', '*.{ts,js}')

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: envConfig.DB_HOST,
      port: envConfig.DB_PORT,
      username: envConfig.DB_USERNAME,
      database: envConfig.DB_NAME,
      password: envConfig.DB_PASSWORD,
      entities: [`${__dirname}/../**/*.entity.{js,ts}`],
      migrations: [migrationsFolder],
      extra: {
        charset: 'utf8mb4_unicode_ci',
      },
      synchronize: false,
      logging: false,
    }
  },
}

export const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: envConfig.DB_HOST,
  port: envConfig.DB_PORT,
  username: envConfig.DB_USERNAME,
  database: envConfig.DB_NAME,
  password: envConfig.DB_PASSWORD,
  entities: [`${__dirname}/../**/*.entity.{js,ts}`],
  migrations: [migrationsFolder],
  extra: {
    charset: 'utf8mb4_unicode_ci',
  },
  synchronize: false,
  logging: false,
}

export default new DataSource(typeOrmConfig)

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

export const runSeed = async () => {
  const dataSource = new DataSource(typeOrmConfig)
  await dataSource.initialize()

  const baseUser = {
    isEmailConfirmed: true,
    timezone: 'America/New_York',
    useSystemTimezone: false,
    role: RolesEnum.SITE_ADMIN,
  }

  logger.log('Seed starts')
  try {
    const user = {
      ...baseUser,
      email: 'admin.nsk@dev',
      password: 'admin.nsk@dev',
    }

    const userRepository = dataSource.getRepository('users')

    const exists = await userRepository.findOne({
      where: { email: user.email },
    })

    if (!exists) {
      await userRepository.create(user).save()
    }
  } catch (error) {
    logger.error(JSON.stringify(error))
    console.log(error)
    await dataSource.destroy()
  }

  await dataSource.destroy()
  logger.log('Seed successful!')
}
