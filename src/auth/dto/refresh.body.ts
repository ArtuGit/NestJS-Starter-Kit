import { IS_JWT, IsNotEmpty } from 'class-validator'

export class RefreshBody {
  @IsNotEmpty()
  readonly refreshToken: string
}
