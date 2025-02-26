import { OmitType } from '@nestjs/swagger'
import { GroupEntity } from '../group.entity'

export class GroupDto extends OmitType(GroupEntity, ['admin', 'members'] as const) {}
