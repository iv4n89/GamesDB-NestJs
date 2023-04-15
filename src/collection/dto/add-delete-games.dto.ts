import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddGameDto {
  @IsNotEmpty()
  games: number[];

  @IsOptional()
  userId: number;
}

export class DeleteGameDto {
  @IsNotEmpty()
  games: number[];

  @IsOptional()
  userId: number;
}
