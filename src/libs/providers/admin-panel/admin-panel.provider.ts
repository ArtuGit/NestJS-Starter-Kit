import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'
import { envConfig } from '../../../config'

const DEFAULT_ADMIN = {
  email: envConfig.ADMIN_EMAIL,
  password: envConfig.ADMIN_PASSWORD,
}

export class AdminPanelProvider {
  private dataSource: DataSource
  constructor(typeOrmConfig: PostgresConnectionOptions) {
    this.dataSource = new DataSource(typeOrmConfig)
    this.dataSource.initialize()
  }

  authenticate = async (email: string, password: string) => {
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      return Promise.resolve(DEFAULT_ADMIN)
    }
    return null
  }
}
