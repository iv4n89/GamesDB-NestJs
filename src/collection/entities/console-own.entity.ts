import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Console } from 'src/console/entities/console.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { Collection } from './collection.entity';

export type ConsoleState =
  | 'perfect'
  | 'very good'
  | 'good'
  | 'acceptable'
  | 'not so good';

@Entity({ name: 'console-owns' })
export class ConsoleOwn extends BaseEntity {
  @ManyToOne(() => Console, (console) => console.consoleOwns)
  @JoinColumn({ name: 'console_id' })
  console: Console;

  @ManyToOne(() => Collection, (collection) => collection.consoleOwns)
  @JoinColumn({ name: 'collection_id' })
  collection: Collection;

  @ManyToMany(() => Tag, (tag) => tag.consoleOwns)
  @JoinTable()
  tags: Tag[];

  @Column('decimal', { name: 'price_paid', default: 0 })
  pricePaid: number;

  @Column('date', { name: 'date_buyed', nullable: true })
  dateBuyed: Date;

  @Column('int', { name: 'has_box', default: 0 })
  hasBox: 0 | 1;

  @Column('int', { name: 'has_manual', default: 0 })
  hasManual: 0 | 1;

  @Column('varchar', { name: 'state', default: 'good' })
  state: ConsoleState;

  @Column('int', { name: 'favorite', default: 0 })
  favorite: 0 | 1;
}
