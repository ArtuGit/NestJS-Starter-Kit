import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Req,
  HttpCode,
  HttpStatus,
  UseFilters,
} from '@nestjs/common'
import { ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger'
import { FileInterceptor } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

import { JwtAuthGuard } from '../users/modules/auth/guards/jwt-auth.guard'
import { GetListQuery, PagedResponse } from '../../common/dto/pagination'
import { IFileUploaded } from '../../common/types/fileUploaded.types'
import { QueryFailedExceptionFilter } from '../../common/filters/typeorm.query-failed-error.filter'

import { CompaniesService } from './companies.service'
import { CreateCompanyBody } from './dto/create-company.body'
import { UpdateCompanyBody } from './dto/update-company.body'
import { Company } from './entities/company.entity'
import { editFileName, imageFileFilter } from './utils/file-upload.utils'
import { ImageUploadResult } from './dto/image-upload.result'
import { PatchCompanyBody } from './dto/patch-company.body'

@ApiTags('Companies')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@UseFilters(QueryFailedExceptionFilter)
@Controller({
  path: 'companies',
  version: '1',
})
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @ApiCreatedResponse({ type: Company })
  @Post()
  async create(@Body() createCompanyBody: CreateCompanyBody): Promise<Company> {
    return this.companiesService.create(createCompanyBody)
  }

  @ApiOkResponse({ type: Company, isArray: true })
  @Get()
  findAll(@Query() query: GetListQuery): Promise<PagedResponse<Company[]>> {
    return this.companiesService.findAll(query)
  }

  @ApiOkResponse({ type: Company })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Company> {
    return this.companiesService.findOne(id)
  }

  @ApiOkResponse({ type: Company })
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCompanyBody: UpdateCompanyBody): Promise<Company> {
    return this.companiesService.update(id, updateCompanyBody)
  }

  @ApiOkResponse({ type: Company })
  @Patch(':id')
  patch(@Param('id') id: string, @Body() patchCompanyBody: PatchCompanyBody): Promise<Company> {
    return this.companiesService.patch(id, patchCompanyBody)
  }

  @ApiOkResponse({ type: ImageUploadResult })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  @Post('upload-logo')
  async uploadFile(
    @Req() req,
    @Body('companyId') companyId: string,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ImageUploadResult> {
    if (!file) {
      throw new BadRequestException('No file')
    }
    await this.companiesService.setLogo(companyId, file.filename)
    return {
      filename: file.filename,
    }
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.companiesService.remove(id)
  }
}
