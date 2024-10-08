import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  ServiceUnavailableException,
  Logger,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { PageDTO, PageMetaDTO, PaginationDTO } from '../../shared'
import { SortDTO } from 'src/shared/dto/sort.dto'
import { Repository, FindOptionsRelations, ILike, FindOptionsWhere } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as moment from 'moment'
import { MailService } from '../mail/mail.service'

import { UserEntity } from './users.entity'
import { envConfig } from '../../config'
import {
  ChangeUserPasswordRequestDto,
  ChangeUserDataRequestDto,
  CreateUserRequestDto,
  SendChangeUserEmailMessageDto,
  SendRestorePasswordRequestDto,
  SetRestoredPasswordRequestDto,
} from './dto'
import { ReturnMessage } from '../../utils'
import { AuthService } from '../auth/auth.service'
import { LoginReturnDTO } from '../auth/dto'
import { HashProvider } from 'src/libs'

@Injectable()
export class UsersService {
  private readonly logger: Logger = new Logger(UsersService.name)

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
  ) {}

  public async findUserByID(id: string, relations?: FindOptionsRelations<UserEntity>): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      relations,
      where: { id },
    })

    if (!user) {
      this.logger.error(`User with ${id} not found`)
      throw new NotFoundException('User not found!')
    }

    return user
  }

  public async findUserByEmail(email: string, relations?: FindOptionsRelations<UserEntity>): Promise<UserEntity> {
    const user = await this.usersRepository.findOne({
      relations,
      where: {
        email: email.toLowerCase(),
      },
      select: ['id', 'createdAt', 'updatedAt', 'fullName', 'userName', 'email', 'isEmailConfirmed', 'password', 'role'],
    })

    if (!user) {
      this.logger.error(`User with ${email} not found`)
      throw new NotFoundException('User not found')
    }

    return user
  }

  public async createUser(input: CreateUserRequestDto): Promise<UserEntity> {
    if (await this.checkEmailExistence(input.email)) {
      this.logger.error(`User with ${input.email} already exists`)
      throw new ConflictException('User exists')
    }

    const user = await this.usersRepository
      .create({
        ...input,
      })
      .save()

    await this.sendActivationEmail(user.id, user.email)

    return user
  }

  public async changeUserPassword({
    id,
    oldPassword,
    newPassword,
    repeatPassword,
  }: ChangeUserPasswordRequestDto): Promise<ReturnMessage> {
    if (newPassword !== repeatPassword) {
      this.logger.error('Passwords mismatch')
      throw new BadRequestException('Passwords mismatch')
    }

    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'password'],
    })

    if (!user) {
      this.logger.error(`User with ${id} not found`)
      throw new NotFoundException('User not found!')
    }

    if (!(await user.checkPassword(oldPassword))) {
      this.logger.error('Wrong password')
      throw new BadRequestException('Wrong password')
    } else {
      if (newPassword === oldPassword) {
        this.logger.error('The new password is the same as the old one')
        throw new BadRequestException('The new password is the same as the old one')
      }

      user.password = await new HashProvider().generateHash(newPassword)
      await user.save()
    }

    return { message: 'Ok' }
  }

  public async setUserEmail(changeToken: string): Promise<ReturnMessage> {
    try {
      const { id, email }: { id: string; email: string } = await this.jwtService.verifyAsync(changeToken, {
        secret: envConfig.EMAIL_JWT_SECRET,
      })

      const user = await this.findUserByID(id)

      user.email = email.toLowerCase()
      await user.save()

      return { message: 'Ok' }
    } catch (error: any & { message: string }) {
      this.logger.error(JSON.stringify(error))
      throw new ForbiddenException(error.message)
    }
  }

  public async activateUser(activateToken: string): Promise<LoginReturnDTO> {
    try {
      const { id }: { id: string } = await this.jwtService.verifyAsync(activateToken, {
        secret: envConfig.EMAIL_JWT_SECRET,
      })

      const user = await this.findUserByID(id)

      if (user.isEmailConfirmed) {
        throw new ForbiddenException('User already activated')
      }

      user.isEmailConfirmed = true
      await user.save()

      return await this.authService.getTokens(user.id)
    } catch (error: any & { message: string }) {
      this.logger.error(JSON.stringify(error))
      throw new ForbiddenException(error.message)
    }
  }

  public async sendChangeUserEmailMessage({
    id,
    password,
    email,
  }: SendChangeUserEmailMessageDto): Promise<ReturnMessage> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'password', 'email'],
    })

    if (!user) {
      this.logger.error(`User with ${id} not found`)
      throw new NotFoundException('User not found!')
    }

    const [passwordValid, emailExists] = await Promise.all([
      user.checkPassword(password),
      this.checkEmailExistence(email),
    ])

    if (!passwordValid) {
      this.logger.error('Wrong password')
      throw new BadRequestException('Wrong password')
    } else if (emailExists) {
      this.logger.error('Email already exists')
      throw new ConflictException('Email already exists')
    }

    const token = await this.jwtService.signAsync(
      { id: user.id, email: email.toLowerCase() },
      {
        secret: envConfig.EMAIL_JWT_SECRET,
        expiresIn: envConfig.EMAIL_JWT_EXPIRES_IN,
      },
    )

    await this.mailService.sendConfirmationEmailMessage({
      to: email,
      data: {
        ConfirmationLink: `${envConfig.FRONTEND_HOST}users/change-email/${token}`,
        OperationText: `Please confirm the new email in ${moment
          .duration(envConfig.EMAIL_JWT_EXPIRES_IN * 1000)
          .asMinutes()} mins, or change email again. If you did not request this change, simply ignore this email.`,
      },
    })

    return { message: 'Ok' }
  }

  public async checkEmailExistence(email: string): Promise<boolean> {
    return !!(await this.usersRepository.findOne({
      where: {
        email: email.toLowerCase(),
      },
    }))
  }

  public async sendActivationEmail(userId: string, email: string): Promise<ReturnMessage> {
    const token = await this.jwtService.signAsync(
      { id: userId },
      {
        secret: envConfig.EMAIL_JWT_SECRET,
        expiresIn: envConfig.EMAIL_ACTIVATION_EXPIRES_IN,
      },
    )

    try {
      await this.mailService.sendConfirmationEmailMessage({
        to: email,
        data: {
          ConfirmationLink: `${envConfig.FRONTEND_HOST}users/activate/${token}`,
          OperationText: `Please confirm the email in ${moment
            .duration(envConfig.EMAIL_ACTIVATION_EXPIRES_IN * 1000)
            .asHours()} hours, or resend activation email.`,
        },
      })
    } catch (error) {
      this.logger.error(JSON.stringify(error))
      throw new ServiceUnavailableException('Error sending email')
    }

    return { message: 'Ok' }
  }

  public async sendRestorePassword({ email, requestFromApi }: SendRestorePasswordRequestDto): Promise<ReturnMessage> {
    const user = await this.findUserByEmail(email)

    const expiresIn = requestFromApi ? envConfig.EMAIL_ACTIVATION_EXPIRES_IN : envConfig.EMAIL_JWT_EXPIRES_IN

    const token = await this.jwtService.signAsync(
      { id: user.id },
      {
        secret: envConfig.EMAIL_JWT_SECRET,
        expiresIn,
      },
    )

    try {
      await this.mailService.sendConfirmationEmailMessage({
        to: email,
        data: {
          ConfirmationLink: `${envConfig.FRONTEND_HOST}users/pass-restore/${token}`,
          OperationText: `Please restore the password in ${moment.duration(expiresIn * 1000).asHours()} hours.`,
        },
      })
    } catch (error) {
      this.logger.error(JSON.stringify(error))
      throw new ServiceUnavailableException('Error sending email')
    }

    return { message: 'Ok' }
  }

  public async setRestoredPassword({
    restoreToken,
    password,
    repeatPassword,
  }: SetRestoredPasswordRequestDto): Promise<ReturnMessage> {
    try {
      const { id }: { id: string; email: string } = await this.jwtService.verifyAsync(restoreToken, {
        secret: envConfig.EMAIL_JWT_SECRET,
      })

      // eslint-disable-next-line security/detect-possible-timing-attacks
      if (password !== repeatPassword) {
        this.logger.error('Passwords mismatch')
        throw new BadRequestException('Passwords mismatch')
      }

      const user = await this.findUserByID(id)

      user.password = await new HashProvider().generateHash(password)
      user.isEmailConfirmed = true
      await user.save()

      return { message: 'Ok' }
    } catch (error: any & { message: string }) {
      this.logger.error(JSON.stringify(error))
      throw new ForbiddenException(error.message)
    }
  }

  public async changeUserNames({ id, fullName, userName }: ChangeUserDataRequestDto): Promise<ReturnMessage> {
    const user = await this.findUserByID(id)

    if (fullName) user.fullName = fullName
    if (userName) user.userName = userName

    await user.save()

    return { message: 'Ok' }
  }

  public async findUsers({
    pagination,
    sort,
    search,
  }: {
    pagination: PaginationDTO
    sort: SortDTO
    search?: string
  }): Promise<PageDTO<UserEntity>> {
    const like = search ? ILike(`%${search.toLowerCase()}%`) : undefined

    const where: FindOptionsWhere<UserEntity>[] = []

    if (like) {
      where.push({ email: like }, { fullName: like }, { userName: like })
    }

    const [entities, count] = await this.usersRepository.findAndCount({
      where: where.length > 0 ? where : undefined,
      order: { [sort.sortBy]: sort.sortDir },
      skip: pagination?.skip,
      take: pagination?.take,
    })

    return new PageDTO(entities, new PageMetaDTO({ pagination, count }))
  }
}
