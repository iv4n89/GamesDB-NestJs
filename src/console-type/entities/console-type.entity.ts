import { Console } from 'src/console/entities/console.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'console-types' })
export class ConsoleType {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @OneToMany(() => Console, (console) => console.type)
  consoles: Console[];
}
