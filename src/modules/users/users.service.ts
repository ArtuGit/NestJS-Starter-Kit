import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  forwardRef,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, FindOptionsRelations, In } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as moment from 'moment'
import * as crypto from 'crypto'

import { User } from './users.entity'
import { WinstonLogger, envConfig } from '../../config'
import {
  ChangeUserPasswordDTO,
  ChangeUserNamesDTO,
  CreateUserDTO,
  SendChangeUserEmailMessageDTO,
  SendRestorePasswordDTO,
  SetRestoredPasswordDTO,
  UpdateSubUserDTO,
} from './dto'
import { ReturnApiAccessKey, ReturnMessage } from '../../utils'
import { HashProvider } from './providers'
import { SendEmailService } from '../send-email/send-email.service'
import { RolesEnum } from './enums'
import { TokenPayloadType } from '../auth/types/types'
import { AuthService } from '../auth/auth.service'
import { LoginReturnDTO } from '../auth/dto'
// import { StripeService } from '../stripe/stripe.service'
// import { TransactionsService } from '../transactions/transactions.service'
// import { TransactionFlowEnum, TransactionTypeEnum } from '../transactions/enums'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,

    @Inject(forwardRef(() => AuthService))
    private authService: AuthService,
    private readonly logger: WinstonLogger,
    private readonly sendEmailService: SendEmailService,
    // private readonly transactionsService: TransactionsService,
    // private readonly stripeService: StripeService,
    private readonly jwtService: JwtService,
  ) {}

  public async findUserByID(id: string, relations?: FindOptionsRelations<User>): Promise<User> {
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

  public async findUserByEmail(email: string, relations?: FindOptionsRelations<User>): Promise<User> {
    const user = await this.usersRepository.findOne({
      relations,
      where: {
        email: email.toLowerCase(),
      },
      select: ['id', 'createdAt', 'updatedAt', 'fullName', 'userName', 'email', 'isEmailConfirmed', 'password', 'role'],
    })

    if (!user) {
      this.logger.error(`User with ${email} not found`)
      throw new NotFoundException('User not found!')
    }

    return user
  }

  public async findSubUserByID(primaryUserId: string, subUserId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id: subUserId, primaryUser: { id: primaryUserId } },
    })

    if (!user) {
      throw new NotFoundException('Sub User not found!')
    }

    return user
  }

  public async findSubUserByStripeCustomerId(stripeCustomerId: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { stripeCustomerId },
    })

    if (!user) {
      throw new NotFoundException('Sub User not found!')
    }

    return user
  }

  public async createUser(input: CreateUserDTO): Promise<User> {
    if (await this.checkEmailExistance(input.email)) {
      this.logger.error(`User with ${input.email} already exists.`)
      throw new ConflictException('User exists')
    }

    // ToDo: newVersion
    //const { id: stripeCustomerId } = await this.stripeService.createStripeCustomer(input.email)

    const user = await this.usersRepository
      .create({
        ...input,
        stripeCustomerId: null, // ToDo: newVersion
        apiAccessKey: 'x_' + crypto.randomBytes(32).toString('hex'),
      })
      .save()

    await this.sendActivationEmail(user.id, user.email)

    return user
  }


  public async updateSubUser(id: string, subUserId: string, { fullName, userName, email, password }: UpdateSubUserDTO) {
    const currentUser = await this.usersRepository.findOne({ where: { id } })

    if (!currentUser) {
      throw new NotFoundException('User not found.')
    }

    const subUser = await this.usersRepository.findOne({
      where: { id: subUserId, primaryUser: { id } },
    })

    if (!subUser) {
      throw new NotFoundException('Sub-User not found.')
    }

    if (fullName) subUser.fullName = fullName
    if (userName) subUser.userName = userName
    if (email) subUser.email = email
    if (password) subUser.password = password

    await subUser.save()

    return { message: 'OK' }
  }

  public async changeUserPassword({
    id,
    oldPassword,
    newPassword,
    repeatPassword,
  }: ChangeUserPasswordDTO): Promise<ReturnMessage> {
    if (newPassword !== repeatPassword) {
      this.logger.error('Passwords mismatch.')
      throw new BadRequestException('Passwords mismatch.')
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
      this.logger.error('Wrong password.')
      throw new BadRequestException('Wrong password.')
    } else {
      if (newPassword === oldPassword) {
        this.logger.error('The new password is the same as the old one.')
        throw new BadRequestException('The new password is the same as the old one.')
      }

      user.password = await new HashProvider().generateHash(newPassword)
      await user.save()
    }

    return { message: 'OK' }
  }

  public async setUserEmail(changeToken: string): Promise<ReturnMessage> {
    try {
      const { id, email }: { id: string; email: string } = await this.jwtService.verifyAsync(changeToken, {
        secret: envConfig.EMAIL_JWT_SECRET,
      })

      const user = await this.findUserByID(id)

      user.email = email.toLowerCase()
      await user.save()

      return { message: 'OK' }
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
        throw new ForbiddenException('User already activated.')
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
  }: SendChangeUserEmailMessageDTO): Promise<ReturnMessage> {
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
      this.checkEmailExistance(email),
    ])

    if (!passwordValid) {
      this.logger.error('Wrong password.')
      throw new BadRequestException('Wrong password.')
    } else if (emailExists) {
      this.logger.error('Email already exists.')
      throw new ConflictException('Email already exists.')
    }

    const token = await this.jwtService.signAsync(
      { id: user.id, email: email.toLowerCase() },
      {
        secret: envConfig.EMAIL_JWT_SECRET,
        expiresIn: envConfig.EMAIL_JWT_EXPIRES_IN,
      },
    )

    await this.sendEmailService.sendConfirmationEmailMessage(user.email, {
      ConfirmationLink: `${envConfig.FRONTEND_HOST}users/change-email/${token}`,
      OperationText: `Please confirm your new email in ${moment
        .duration(envConfig.EMAIL_JWT_EXPIRES_IN * 1000)
        .asMinutes()} mins, or change email again. If you did not request this change, simply ignore this email.`,
    })

    return { message: 'OK' }
  }

  public async checkEmailExistance(email: string): Promise<boolean> {
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
      await this.sendEmailService.sendConfirmationEmailMessage(email, {
        ConfirmationLink: `${envConfig.FRONTEND_HOST}users/activate/${token}`,
        OperationText: `Please confirm your email in ${moment
          .duration(envConfig.EMAIL_ACTIVATION_EXPIRES_IN * 1000)
          .asHours()} hours, or resend activation email.`,
      })
    } catch (error) {
      this.logger.error(JSON.stringify(error))
    }

    return { message: 'OK' }
  }

  public async sendRestorePassword({ email, requestFromApi }: SendRestorePasswordDTO): Promise<ReturnMessage> {
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
      await this.sendEmailService.sendConfirmationEmailMessage(email, {
        ConfirmationLink: `${envConfig.FRONTEND_HOST}users/pass-restore/${token}`,
        OperationText: `Please restore your password in ${moment.duration(expiresIn * 1000).asHours()} hours.`,
      })
    } catch (error) {
      this.logger.error(JSON.stringify(error))
    }

    return { message: 'OK' }
  }

  public async setRestoredPassword({
    restoreToken,
    password,
    repeatPassword,
  }: SetRestoredPasswordDTO): Promise<ReturnMessage> {
    try {
      const { id }: { id: string; email: string } = await this.jwtService.verifyAsync(restoreToken, {
        secret: envConfig.EMAIL_JWT_SECRET,
      })

      if (password !== repeatPassword) {
        this.logger.error('Passwords mismatch.')
        throw new BadRequestException('Passwords mismatch.')
      }

      const user = await this.findUserByID(id)

      user.password = await new HashProvider().generateHash(password)
      user.isEmailConfirmed = true
      await user.save()

      return { message: 'OK' }
    } catch (error: any & { message: string }) {
      this.logger.error(JSON.stringify(error))
      throw new ForbiddenException(error.message)
    }
  }

  public async changeUserNames({ id, fullName, userName }: ChangeUserNamesDTO): Promise<ReturnMessage> {
    const user = await this.findUserByID(id)

    if (fullName) user.fullName = fullName
    if (userName) user.userName = userName

    await user.save()

    return { message: 'OK' }
  }
}
