import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateGroupRequestDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string

  @IsString()
  @MaxLength(255)
  description?: string
}
