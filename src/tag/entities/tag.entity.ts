import { ConsoleOwn } from 'src/collection/entities/console-own.entity';
import { GameOwn } from 'src/collection/entities/game-own.entity';
import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'tags' })
export class Tag extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  color: string;

  @ManyToMany(() => Console, (console) => console.tags)
  @JoinTable()
  consoles: Console[];

  @ManyToMany(() => Game, (game) => game.tags)
  @JoinTable()
  games: Game[];

  @ManyToMany(() => GameOwn, (gameOwn) => gameOwn.tags)
  gameOwns: GameOwn[];

  @ManyToMany(() => ConsoleOwn, (consoleOwn) => consoleOwn.tags)
  consoleOwns: ConsoleOwn[];
}
