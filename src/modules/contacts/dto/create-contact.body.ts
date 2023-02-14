import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateContactBody {
  @IsString()
  @IsNotEmpty()
  name: string

  @IsNumber()
  @IsNotEmpty()
  age: number

  @IsString()
  @IsOptional()
  breed?: string
}
