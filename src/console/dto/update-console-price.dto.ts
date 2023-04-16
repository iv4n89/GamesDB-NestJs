import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateConsolePriceDto {
  @IsNotEmpty()
  price: number;

  @IsOptional()
  @IsString()
  currency?: string;
}
