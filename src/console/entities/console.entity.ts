import { IsOptional } from 'class-validator';
import { Collection } from 'src/collection/entities/collection.entity';
import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Price } from 'src/common/entities/Price.entity';
import { ConsoleType } from 'src/console-type/entities/console-type.entity';
import { Game } from 'src/game/entities/game.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Zone } from 'src/zone/entities/zone.entity';
import {
  AfterLoad,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'consoles' })
export class Console extends BaseEntity {
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

  @OneToMany(() => Price, (price) => price.console)
  prices: Price[];

  @IsOptional()
  lastPrice: Price;

  @AfterLoad()
  getLastPrice() {
    if (this?.prices?.length) {
      this.lastPrice = this?.prices[this?.prices?.length - 1];
    }
  }
}
