import { HashProvider } from '../../../modules/users/providers'
import { RolesEnum } from '../../../shared'
import { CurrentAdmin } from './admin-panel.interfaces'
import { DataSource } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export class AdminPanelProvider {
  private dataSource: DataSource
  constructor(typeOrmConfig: PostgresConnectionOptions) {
    this.dataSource = new DataSource(typeOrmConfig)
  }

  authenticate = async (email: string, password: string): Promise<CurrentAdmin | null> => {
    if (!this.dataSource.isInitialized) {
      await this.dataSource.initialize()
    }

    const admin = await this.dataSource
      .getRepository('UserEntity')
      .findOne({ where: { email, role: RolesEnum.SITE_ADMIN }, select: ['email', 'password'] })

    if (admin && new HashProvider().compareHash(admin.password, password)) {
      return {
        email: admin.email,
        ...(admin.username ? { title: admin.username } : {}),
      }
    }
    return null
  }
}
