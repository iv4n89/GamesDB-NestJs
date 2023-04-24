import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import { JoinColumn, ManyToOne, Entity } from 'typeorm';
import { BaseEntity } from '../BaseEntity.entity';

@Entity('wanted')
export class Wanted extends BaseEntity {
  @ManyToOne(() => User, (user) => user.wanted)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Console, (console) => console.wanted, { nullable: true })
  @JoinColumn({ name: 'console_id' })
  console: Console;

  @ManyToOne(() => Game, (game) => game.wanted, { nullable: true })
  @JoinColumn({ name: 'game_id' })
  game: Game;
}
