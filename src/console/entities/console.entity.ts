import { Collection } from 'src/collection/entities/collection.entity';
import { ConsoleType } from 'src/console-type/entities/console-type.entity';
import { Game } from 'src/game/entities/game.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Zone } from 'src/zone/entities/zone.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @ManyToOne(() => Manufacturer, (manufacturer) => manufacturer.consoles)
  @JoinColumn({ name: 'manufacturer_id' })
  manufacturer: Manufacturer;

  @ManyToOne(() => ConsoleType, (consoleType) => consoleType.consoles)
  @JoinColumn({ name: 'console_type_id' })
  type: ConsoleType;

  @ManyToOne(() => Zone, (zone) => zone.consoles)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @ManyToMany(() => Tag, (tag) => tag.consoles)
  tags: Tag[];

  @ManyToMany(() => Collection, (collection) => collection.consoles)
  collections: Collection[];
}
