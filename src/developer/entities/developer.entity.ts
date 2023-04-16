import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Country } from 'src/country/entities/country.entity';
import { Game } from 'src/game/entities/game.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'developers' })
export class Developer extends BaseEntity {
  @Column('varchar')
  name: string;

  @OneToMany(() => Game, (game) => game.developer)
  games: Game[];

  @ManyToOne(() => Country, (country) => country.developers)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
