import { BadRequestException, Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common'
import { compareSync, hash } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RegisterBody } from '../auth/dto'
import { IDbWhereCond } from '../common/types/database.types'

import { IUser, IUserPublicPartial } from './interfaces/user.interface'
import { User, UserPublic } from './entities/user.entity'

@Injectable()
export class UsersService {
  private readonly users: IUser[]

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
    const exUser = await this.findOneByUserName(body.username)

    if (exUser) {
      throw new UnprocessableEntityException(`Username '${body.username}' already in use`)
    }

    const passwordHashed = await hash(body.password, 10)
    const userToSave: User = {
      ...new User(),
      ...body,
    }
    await this.userRepository.save(userToSave)
    const { password: pass, ...userToRet } = userToSave
    return userToRet
  }

  async findOneById(id: string): Promise<IUser> {
    return this.users.find((user) => user.id === id)
  }

  async findOneByUserName(username: string): Promise<IUser> {
    return this.users.find((user) => user.username === username)
  }

  async findOneByPayload(payload: IUserPublicPartial, exception = true): Promise<IUser> {
    let user: IUser = null
    user = await this.userRepository.findOne(payload)
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
      users = await this.userRepository.find(payload)
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

  async validateCredentials(username: string, pass: string): Promise<UserPublic> {
    const user = await this.findOneByUserName(username)
    if (user && compareSync(pass, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}
