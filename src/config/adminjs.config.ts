import { UserEntity } from '../modules/users/users.entity'
import { GroupEntity } from '../modules/group/group.entity'
import { AdminPanelProvider } from '../libs'
import { typeOrmConfig } from './typeorm.config'

const adminPanelProvider = new AdminPanelProvider(typeOrmConfig)

export const adminJsConfig = {
  adminJsOptions: {
    rootPath: '/admin',
    resources: [
      {
        resource: UserEntity,
      },
      {
        resource: GroupEntity,
      },
    ],
  },
  auth: {
    authenticate: adminPanelProvider.authenticate,
    cookieName: 'adminjs',
    cookiePassword: 'secret',
  },
  sessionOptions: {
    resave: true,
    saveUninitialized: true,
    secret: 'secret',
  },
}
