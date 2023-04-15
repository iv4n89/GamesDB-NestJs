import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'collections' })
export class Collection {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, (user) => user.collection)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToMany(() => Console, (console) => console.collections)
  @JoinTable()
  consoles: Console[];

  @ManyToMany(() => Game, (game) => game.collections)
  @JoinTable()
  games: Game[];
}
