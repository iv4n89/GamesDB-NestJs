import { IsNotEmpty } from 'class-validator';

export class AddGame {
  @IsNotEmpty()
  games: number[];
}

export class DeleteGame {
  @IsNotEmpty()
  games: number[];
}
