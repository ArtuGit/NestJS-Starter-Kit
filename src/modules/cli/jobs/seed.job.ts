import { Injectable } from '@nestjs/common'
import { DataSource } from 'typeorm'
import { typeOrmConfig } from '../../../config'
import { USERS_SEED_DATA } from '../../../seed'
import { RolesEnum } from '../../../shared'
import { Job } from './job.type'

@Injectable()
export class SeedJob implements Job {
  async run() {
    const dataSource = new DataSource(typeOrmConfig)
    await dataSource.initialize()

    const baseUser = {
      isEmailConfirmed: true,
      timezone: 'America/New_York',
      useSystemTimezone: false,
      role: RolesEnum.SITE_ADMIN,
    }

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

      await Promise.all(USERS_SEED_DATA.map((statement) => userRepository.query(statement)))
    } catch (error) {
      console.error(JSON.stringify(error))
      console.log(error)
      await dataSource.destroy()
    }

    await dataSource.destroy()
  }
}
