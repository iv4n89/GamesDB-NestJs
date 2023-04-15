import { Console } from 'src/console/entities/console.entity';
import { Country } from 'src/country/entities/country.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'manufacturers' })
export class Manufacturer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  name: string;

  @Column('text', { nullable: true })
  history: string;

  @OneToMany(() => Console, (console) => console.manufacturer)
  consoles: Console[];

  @ManyToOne(() => Country, (country) => country.manufacturers)
  @JoinColumn({ name: 'country_id' })
  country: Country;
}
