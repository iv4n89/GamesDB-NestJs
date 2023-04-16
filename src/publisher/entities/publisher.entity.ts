import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Game } from 'src/game/entities/game.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'publishers' })
export class Publisher extends BaseEntity {
  @Column('varchar')
  name: string;

  @OneToMany(() => Game, (game) => game.publisher)
  games: Game[];
}
