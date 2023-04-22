import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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

  @IsOptional()
  developer: number;

  @IsOptional()
  genres?: number[];

  @IsOptional()
  publisher?: number;

  @IsOptional()
  zone?: number;

  @IsOptional()
  tags?: number[];

  @IsOptional()
  price?: {
    price: number;
    currency?: string;
  };

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  artwors?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  screenshots?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  coverImages?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  videos?: string[];
}
