import { Game } from 'src/game/entities/game.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'consoles' })
export class Console {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('text', { nullable: true })
  history: string;

  @Column('date', { nullable: true })
  launchDate: Date;

  @Column('date', { nullable: true })
  retirementDate: Date;

  @Column('varbinary', { nullable: true })
  otherNames: string[];

  @Column('int', { nullable: true, default: 0 })
  isSpecialEdition: number;

  @OneToMany(() => Game, (game) => game.console)
  games: Game[];
}
