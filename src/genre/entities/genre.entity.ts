import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Game } from 'src/game/entities/game.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';

@Entity({ name: 'genres' })
export class Genre extends BaseEntity {
  @Column('varchar')
  name: string;

  @ManyToMany(() => Game, (game) => game.genres)
  @JoinTable()
  games: Game[];
}
