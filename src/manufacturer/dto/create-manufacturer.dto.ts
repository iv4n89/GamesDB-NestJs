import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateManufacturerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  country: number;
}
