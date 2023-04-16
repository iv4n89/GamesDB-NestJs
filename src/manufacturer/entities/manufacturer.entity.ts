import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Console } from 'src/console/entities/console.entity';
import { Country } from 'src/country/entities/country.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'manufacturers' })
export class Manufacturer extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('text', { nullable: true }) X;
  history: string;

  @OneToMany(() => Console, (console) => console.manufacturer)
  consoles: Console[];

  @ManyToOne(() => Country, (country) => country.manufacturers)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
