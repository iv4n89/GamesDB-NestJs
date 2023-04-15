import { Game } from 'src/game/entities/game.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'genres' })
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @ManyToMany(() => Game, (game) => game.genres)
  @JoinTable()
  games: Game[];
}
