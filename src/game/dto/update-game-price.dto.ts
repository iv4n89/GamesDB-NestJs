import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateGamePriceDto {
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  currency?: string;
}
