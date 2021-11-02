import { Injectable, UnprocessableEntityException } from '@nestjs/common'
import { compareSync, hash, hashSync } from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { usersStorage } from './storage/users.storage'
import { IUser } from './interfaces/user.interface'
import { User, UserPublic } from './entities/user.entity'

@Injectable()
export class UsersService {
  private readonly users: IUser[]

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    this.users = usersStorage
  }

  public async register(username: string, password: string): Promise<UserPublic> {
    const exUser = await this.findOneByUserName(username)

    if (exUser) {
      throw new UnprocessableEntityException(`Username '${username}' already in use`)
    }

    const id = Math.floor(10000000 + Math.random() * 90000000).toString()
    const passwordHashed = await hash(password, 10)
    const userToSave: IUser = {
      id,
      username,
      password: passwordHashed,
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

  async validateCredentials(username: string, pass: string): Promise<UserPublic> {
    const user = await this.findOneByUserName(username)
    if (user && compareSync(pass, user.password)) {
      const { password, ...result } = user
      return result
    }
    return null
  }
}
