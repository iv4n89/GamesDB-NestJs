import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateDeveloperDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  country: number;
}
