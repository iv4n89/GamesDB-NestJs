import {
  IsArray,
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateConsoleDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  history: string;

  @IsOptional()
  @IsDateString()
  launchDate: string;

  @IsOptional()
  @IsDateString()
  retirementDate: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  otherNames: string[];

  @IsOptional()
  @IsInt()
  isSpecialEdition: number;

  @IsNotEmpty()
  manufacturer: number;

  @IsOptional()
  type: number;

  @IsOptional()
  tags?: number[];

  @IsOptional()
  price: { price: number; currency?: string };
}
