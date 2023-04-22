import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Collection } from 'src/collection/entities/collection.entity';
import { Following } from 'src/collection/entities/following.entity';
import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Favorite } from 'src/common/entities/Favorites.entity';
import { Wanted } from 'src/common/entities/Wanted.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Role } from './roles.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty()
  @Column('varchar')
  name: string;

  @ApiProperty()
  @Column('varchar')
  lastName: string;

  @ApiPropertyOptional()
  @Column('varchar', { unique: true })
  email: string;

  @ApiPropertyOptional()
  @Column('date', { nullable: true })
  birthDate: Date;

  @ApiPropertyOptional()
  @Column('varchar', { unique: true })
  username: string;

  @ApiProperty()
  @Column('varchar')
  password: string;

  @OneToOne(() => Collection, (collection) => collection.user)
  collection: Collection;

  @ApiPropertyOptional()
  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @OneToMany(() => Following, (following) => following.user)
  followings: Following[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => Wanted, (wanted) => wanted.user)
  wanted: Wanted[];
}
