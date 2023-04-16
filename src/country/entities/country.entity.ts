import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Developer } from 'src/developer/entities/developer.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity({ name: 'countries' })
export class Country extends BaseEntity {
  @Column('varchar')
  name: string;

  @OneToMany(() => Developer, (developer) => developer.country)
  developers: Developer[];

  @OneToMany(() => Manufacturer, (manufacturer) => manufacturer.country)
  manufacturers: Manufacturer[];
}
