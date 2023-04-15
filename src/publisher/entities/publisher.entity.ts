import { Game } from 'src/game/entities/game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'publishers' })
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => Game, (game) => game.publisher)
  games: Game[];
}
