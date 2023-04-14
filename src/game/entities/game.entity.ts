import { Console } from 'src/console/entities/console.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'games' })
export class Game {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('int', { nullable: true, default: 0 })
  isSpecialEdition: number;

  @ManyToOne(() => Console, (console) => console.games)
  @JoinColumn({ name: 'console_id' })
  console: Console;
}
