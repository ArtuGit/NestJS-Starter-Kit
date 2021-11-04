import { Body, Controller, Param, Post, UseFilters, UseGuards } from '@nestjs/common'
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger'

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard'
import { QueryFailedExceptionFilter } from '../common/filters/typeorm.query-failed-error.filter'
import { Company } from '../companies/entities/company.entity'
import { CreateCompanyBody } from '../companies/dto/create-company.body'
import { UserId } from '../auth/decorators/user.decorator'

@ApiTags('Users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseFilters(QueryFailedExceptionFilter)
@Controller({
  path: 'user',
  version: '1',
})
export class UsersController {
  @Post(':companyId')
  async addMeToCompany(@UserId() userId: string, @Param('companyId') recordingId: string): Promise<void> {
    console.log('To be implemented!')
  }
}
