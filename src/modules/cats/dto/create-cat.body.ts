import { IsNumber, IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CreateCatBody {
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
