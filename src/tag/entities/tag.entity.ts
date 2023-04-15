import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tags' })
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

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
}
