import { IsOptional } from 'class-validator';
import { Collection } from 'src/collection/entities/collection.entity';
import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Price } from 'src/common/entities/Price.entity';
import { Console } from 'src/console/entities/console.entity';
import { Developer } from 'src/developer/entities/developer.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { UserGameStatic } from 'src/user-game-statics/entities/user-game-static.entity';
import { Zone } from 'src/zone/entities/zone.entity';
import {
  AfterInsert,
  AfterLoad,
  AfterUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'games' })
export class Game extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar', { nullable: true })
  description: string;

  @Column('int', { nullable: true, default: 0 })
  isSpecialEdition: number;

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

  @ManyToMany(() => Collection, (collection) => collection.games)
  collections: Collection[];

  @OneToMany(() => UserGameStatic, (gameStatic) => gameStatic.game)
  userGameStatics: UserGameStatic[];

  @OneToMany(() => Price, (price) => price.game)
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
