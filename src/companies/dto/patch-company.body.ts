import { PartialType } from '@nestjs/swagger'

import { UpdateCompanyBody } from './update-company.body'

export class PatchCompanyBody extends PartialType(UpdateCompanyBody) {}
