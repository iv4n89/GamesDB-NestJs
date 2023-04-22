import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Game } from 'src/game/entities/game.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Collection } from './collection.entity';

export type GameState =
  | 'perfect'
  | 'very good'
  | 'good'
  | 'acceptable'
  | 'not so good';

export type GameStatus =
  | 'not played'
  | 'to start'
  | 'started'
  | 'playing'
  | 'paused'
  | 'droped'
  | 'completed'
  | 'dominated';

@Entity({ name: 'game-owns' })
export class GameOwn extends BaseEntity {
  @ManyToOne(() => Game, (game) => game.gameOwns)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => Collection, (collection) => collection.gameOwns)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @ManyToMany(() => Tag, (tag) => tag.gameOwns)
  @JoinTable()
  tags: Tag[];

  @Column('decimal', { name: 'price_paid', default: 0 })
  pricePaid: number;

  @Column('date', { name: 'date_buyed', nullable: true })
  dateBuyed: Date;

  @Column('int', { name: 'has_box', default: 0 })
  hasBox: 0 | 1;

  @Column('int', { name: 'has_manual', default: 0 })
  hasManual: 0 | 1;

  @Column('int', { name: 'hours_played', default: 0 })
  hoursPlayed: number;

  @Column('varchar', { name: 'status', default: 'good' })
  state: GameState;

  @Column('varchar', { name: 'state', default: 'not played' })
  status: GameStatus;
}
