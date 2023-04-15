import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCollectionDto {
  @IsNotEmpty()
  user: number;

  @IsOptional({ each: true })
  consoles: number[];

  @IsOptional({ each: true })
  games: number[];
}
