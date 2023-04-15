import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'zones' })
export class Zone {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => Console, (console) => console.zone)
  consoles: Console[];

  @OneToMany(() => Game, (game) => game.zone)
  games: Game[];
}
