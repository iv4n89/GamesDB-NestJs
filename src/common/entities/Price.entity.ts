import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../BaseEntity.entity';

@Entity({ name: 'prices' })
export class Price extends BaseEntity {
  @Column('float')
  price: number;

  @Column('varchar', { nullable: true, default: 'dollar' })
  currency: string;

  @ManyToOne(() => Console, (console) => console.prices)
  @JoinColumn({ name: 'console_id' })
  console: Console;

  @ManyToOne(() => Game, (game) => game.prices)
  @JoinColumn({ name: 'game_id' })
  game: Game;
}
