import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export type UserGameStaticStatus =
  | 'NOT_PLAYED'
  | 'STARTED'
  | 'PLAYING'
  | 'PLAYED'
  | 'PAUSED'
  | 'DROPPED';

@Entity({ name: 'user_game_statics' })
export class UserGameStatic {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userGameStatics)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Game, (game) => game.userGameStatics)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @Column('varchar', { nullable: true, default: 'NOT_PLAYED' })
  status: UserGameStaticStatus;

  @Column('int', { nullable: true, default: 0 })
  playedHours: number;

  @Column('int', { nullable: true, default: 0 })
  favorite: 0 | 1;
}
