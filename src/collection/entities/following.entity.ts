import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'followings' })
export class Following extends BaseEntity {
  @ManyToOne(() => User, (user) => user.followings)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Game, (game) => game.followings)
  @JoinColumn({ name: 'game_id' })
  game: Game;

  @ManyToOne(() => Console, (console) => console.followings)
  @JoinColumn({ name: 'console_id' })
  console: Console;

  @Column('date', { name: 'last_price_date', nullable: true })
  lastPriceDate: Date;

  @Column('decimal', { name: 'last_price_amount', nullable: true })
  lastPriceAmount: number;

  @Column('date', { name: 'last_notification_date', nullable: true })
  lastNotificationDate: Date;
}
