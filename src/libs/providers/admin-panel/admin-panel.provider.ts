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
  }

  authenticate = async (email: string, password: string) => {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize()
    }
    // ToDo: admin.nsk@dev - admin email
    const admin = await this.dataSource.getRepository('UserEntity').findOne({ where: { email, role: "Site Admin" } })
    console.log({email, admin})
    return null
  }
}
