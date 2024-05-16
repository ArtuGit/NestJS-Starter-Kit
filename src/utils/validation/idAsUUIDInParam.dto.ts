import { IsUUID } from 'class-validator'

export class ValidateIdAsUUIDInParamDTO {
  @IsUUID('4')
  id: string
}
