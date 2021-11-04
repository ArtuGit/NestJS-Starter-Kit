import { IsNotEmpty } from 'class-validator'

export class RefreshBody {
  @IsNotEmpty()
  readonly refreshToken: string
}
