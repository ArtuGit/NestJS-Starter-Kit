import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, ILike, FindOptionsWhere } from 'typeorm'
import { GroupEntity } from './group.entity'
import { UserEntity } from '../users/users.entity'
import { CreateGroupRequestDto } from './dto'
import { PageDTO, PageMetaDTO, PaginationDTO } from '../../shared'
import { SortDTO } from '../../shared/dto/sort.dto'

@Injectable()
export class GroupService {
  private readonly logger: Logger = new Logger(GroupService.name)

  constructor(
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createGroup(input: CreateGroupRequestDto, adminId: string): Promise<GroupEntity> {
    const admin = await this.userRepository.findOne({ where: { id: adminId } })
    if (!admin) {
      throw new NotFoundException('Admin user not found')
    }

    const group = this.groupRepository.create({
      ...input,
      admin,
      members: [admin], // Admin is automatically a member
    })

    return this.groupRepository.save(group)
  }

  async joinGroup(groupId: string, userId: string): Promise<GroupEntity> {
    const [user, group] = await Promise.all([
      this.userRepository.findOne({ where: { id: userId } }),
      this.groupRepository.findOne({
        where: { id: groupId },
        relations: ['members'],
      }),
    ])

    if (!group) {
      this.logger.error(`Group with id ${groupId} not found`)
      throw new NotFoundException('Group not found')
    }

    if (!group.members) {
      group.members = []
    }

    group.members.push(user)
    return this.groupRepository.save(group)
  }

  async findGroups({
    pagination,
    sort,
    search,
  }: {
    pagination: PaginationDTO
    sort: SortDTO
    search?: string
  }): Promise<PageDTO<GroupEntity>> {
    const like = search ? ILike(`%${search.toLowerCase()}%`) : undefined

    const where: FindOptionsWhere<GroupEntity>[] = []

    if (like) {
      where.push({ name: like }, { description: like })
    }

    const [entities, count] = await this.groupRepository.findAndCount({
      where: where.length > 0 ? where : undefined,
      order: { [sort.sortBy]: sort.sortDir },
      skip: pagination?.skip,
      take: pagination?.take,
      relations: ['admin'], // Include admin relation for complete info
    })

    return new PageDTO(entities, new PageMetaDTO({ pagination, count }))
  }

  async findGroupById(id: string): Promise<GroupEntity> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['admin', 'members'],
    })

    if (!group) {
      this.logger.error(`Group with id ${id} not found`)
      throw new NotFoundException('Group not found')
    }

    return group
  }
}
