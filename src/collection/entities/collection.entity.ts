import { IsOptional } from 'class-validator';
import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import { AfterLoad, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { ConsoleOwn } from './console-own.entity';
import { GameOwn } from './game-own.entity';

@Entity({ name: 'collections' })
export class Collection extends BaseEntity {
  @OneToOne(() => User, (user) => user.collection)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => ConsoleOwn, (consoleOwn) => consoleOwn.collection)
  consoleOwns: ConsoleOwn[];

  @OneToMany(() => GameOwn, (gameOwn) => gameOwn.collection)
  gameOwns: GameOwn[];

  @IsOptional()
  consoles: Console[];

  @IsOptional()
  games: Game[];

  @AfterLoad()
  setCollectionRaw() {
    if (this.consoleOwns?.length) {
      this.consoles = this.consoleOwns?.map((co) => co.console);
    }

    if (this.gameOwns?.length) {
      this.games = this.gameOwns?.map((go) => go.game);
    }
  }
}
