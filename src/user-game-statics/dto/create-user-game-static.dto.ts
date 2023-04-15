import { IsNotEmpty, IsOptional } from 'class-validator';
import { UserGameStaticStatus } from '../entities/user-game-static.entity';

export class CreateUserGameStaticDto {
  @IsNotEmpty()
  user: number;

  @IsNotEmpty()
  game: number;

  @IsOptional()
  status: UserGameStaticStatus;

  @IsOptional()
  playedHours: number;

  @IsOptional()
  favorite: 0 | 1;
}
