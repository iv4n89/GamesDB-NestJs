import { IsOptional } from 'class-validator';
import { ConsoleOwn } from 'src/collection/entities/console-own.entity';
import { Following } from 'src/collection/entities/following.entity';
import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Favorite } from 'src/common/entities/Favorites.entity';
import { Price } from 'src/common/entities/Price.entity';
import { Wanted } from 'src/common/entities/Wanted.entity';
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

  @Column('varbinary', { nullable: true })
  consoleImages: string[];

  @Column('varbinary', { nullable: true })
  boxImages: string[];

  @Column('varbinary', { nullable: true })
  videos: string[];

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

  @ManyToOne(() => ConsoleOwn, (consoleOwn) => consoleOwn.console)
  consoleOwns: ConsoleOwn[];

  @OneToMany(() => Price, (price) => price.console)
  prices: Price[];

  @IsOptional()
  lastPrice: Price;

  @OneToMany(() => Following, (following) => following.console)
  followings: Following[];

  @OneToMany(() => Favorite, (favorite) => favorite.console)
  favorites: Favorite[];

  @OneToMany(() => Wanted, (wanted) => wanted.console)
  wanted: Wanted[];

  @AfterLoad()
  getLastPrice() {
    if (this?.prices?.length) {
      this.lastPrice = this?.prices[this?.prices?.length - 1];
    }
  }
}
