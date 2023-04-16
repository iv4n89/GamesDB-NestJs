import {
  IsDateString,
  IsDecimal,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class ConsoleToFollowingDto {
  @IsNotEmpty()
  console: number;

  @IsOptional()
  @IsDateString()
  lastPriceDate?: Date;

  @IsOptional()
  @IsDecimal()
  lastPriceAmount?: number;
}

export class GameToFollowingDto {
  @IsNotEmpty()
  game: number;

  @IsOptional()
  @IsDateString()
  lastPriceDate?: Date;

  @IsOptional()
  @IsDecimal()
  lastPriceAmount?: number;
}

export class UpdateFollowingDto {
  @IsOptional()
  @IsDateString()
  lastPriceDate?: Date;

  @IsOptional()
  @IsDecimal()
  lastPriceAmount?: number;
}
