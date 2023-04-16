import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Console } from 'src/console/entities/console.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'console-types' })
export class ConsoleType extends BaseEntity {
  @Column('varchar')
  name: string;

  @OneToMany(() => Console, (console) => console.type)
  consoles: Console[];
}
