import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { compareSync, hash } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Role } from '../../common/roles/role.enum'
import { IDbWhereCond } from '../../common/types/database.types'

import { RegisterBody } from './modules/auth/dto'
import { IUser, IUserPublic, IUserPublicPartial } from './interfaces/user.interface'
import { User, UserPublic } from './entities/user.entity'
import { TEST_USER } from './mocks/users.mocks'

const isDev = process.env.NODE_ENV !== 'production'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async register(body: RegisterBody): Promise<UserPublic> {
    const users = await this.findByPayload(
      {
        username: body.username,
        email: body.email,
      },
      'OR',
      false,
    )
    if (users.length > 0) {
      throw new BadRequestException(`Username (${body.username}) or email (${body.email}) is already registered`)
    }
    const exUser = await this.findOneByPayload({ username: body.username }, false)

    if (exUser) {
      throw new UnprocessableEntityException(`Username '${body.username}' already in use`)
    }

    const passwordHashed = await hash(body.password, 10)
    const userToSave: User = {
      ...new User(),
      ...body,
      roles: [Role.User],
      password: passwordHashed,
    }
    await this.userRepository.save(userToSave)
    const { password: pass, ...userToRet } = userToSave
    return userToRet
  }

  async findOneByPayload(payload: IUserPublicPartial, exception = true): Promise<IUser> {
    let user: IUser = null
    user = await this.userRepository.findOne({ where: { ...payload } })
    if (!user && exception) {
      throw new NotFoundException(`User (payload=${payload}) is not found`)
    }
    return user
  }

  async findByPayload(
    payload: IUserPublicPartial,
    dbWhereCond: IDbWhereCond = 'AND',
    exception = true,
  ): Promise<IUser[]> {
    let users: IUser[] = []
    if (dbWhereCond === 'AND') {
      users = await this.userRepository.find({ where: { ...payload } })
    } else {
      users = await this.userRepository.find({
        where: Object.entries(payload).map(([k, v]) => ({ [k]: v })),
      })
    }
    if (users.length === 0 && exception) {
      throw new NotFoundException(`User (payload=${JSON.stringify(payload)}) is not found`)
    }
    return users
  }

  async validateCredentials(username: string, pass: string): Promise<IUserPublic> {
    let user: IUser = null
    if (isDev && username === TEST_USER.username && pass === TEST_USER.password) {
      user = <any>TEST_USER
    } else {
      user = await this.findOneByPayload({ username }, false)
      if (user && compareSync(pass, user.password)) {
        const { password, ...result } = user
        user = <IUser>result
      }
    }
    return user
  }
}
