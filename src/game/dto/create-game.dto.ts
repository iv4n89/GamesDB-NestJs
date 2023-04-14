import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateGameDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsNumber()
  isSpecialEdition: number;

  @IsNotEmpty()
  console: number;
}
