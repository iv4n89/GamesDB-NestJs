import { IsOptional } from 'class-validator';
import { Following } from 'src/collection/entities/following.entity';
import { GameOwn } from 'src/collection/entities/game-own.entity';
import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Favorite } from 'src/common/entities/Favorites.entity';
import { Price } from 'src/common/entities/Price.entity';
import { Wanted } from 'src/common/entities/Wanted.entity';
import { Console } from 'src/console/entities/console.entity';
import { Developer } from 'src/developer/entities/developer.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
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

@Entity({ name: 'games' })
export class Game extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('int', { nullable: true, default: 0 })
  isSpecialEdition: number;

  @Column('varbinary', { nullable: true })
  artworks: string[];

  @Column('varbinary', { nullable: true })
  screenshots: string[];

  @Column('varbinary', { nullable: true })
  coverImages: string[];

  @Column('varbinary', { nullable: true })
  videos: string[];

  @ManyToOne(() => Console, (console) => console.games)
  @JoinColumn({ name: 'console_id' })
  console: Console;

  @ManyToOne(() => Developer, (developer) => developer.games)
  @JoinColumn({ name: 'developer_id' })
  developer: Developer;

  @ManyToMany(() => Genre, (genre) => genre.games)
  genres: Genre[];

  @ManyToOne(() => Publisher, (publisher) => publisher.games)
  @JoinColumn({ name: 'publisher_id' })
  publisher: Publisher;

  @ManyToOne(() => Zone, (zone) => zone.games)
  @JoinColumn({ name: 'zone_id' })
  zone: Zone;

  @ManyToMany(() => Tag, (tag) => tag.games)
  tags: Tag[];

  @OneToMany(() => GameOwn, (gameStatic) => gameStatic.game)
  gameOwns: GameOwn[];

  @OneToMany(() => Price, (price) => price.game)
  prices: Price[];

  @IsOptional()
  lastPrice: Price;

  @OneToMany(() => Following, (following) => following.game)
  followings: Following[];

  @OneToMany(() => Favorite, (favorite) => favorite.game)
  favorites: Favorite[];

  @OneToMany(() => Wanted, (wanted) => wanted.game)
  wanted: Wanted[];

  @AfterLoad()
  getLastPrice() {
    if (this?.prices?.length) {
      this.lastPrice = this?.prices[this?.prices?.length - 1];
    }
  }
}
