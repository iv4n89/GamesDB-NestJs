import { Collection } from 'src/collection/entities/collection.entity';
import { BaseEntity } from 'src/common/BaseEntity.entity';
import { UserGameStatic } from 'src/user-game-statics/entities/user-game-static.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Role } from './roles.entity';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('varchar')
  lastName: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('date', { nullable: true })
  birthDate: Date;

  @Column('varchar', { unique: true })
  username: string;

  @Column('varchar')
  password: string;

  @OneToOne(() => Collection, (collection) => collection.user)
  collection: Collection;

  @OneToMany(() => UserGameStatic, (gameStatic) => gameStatic.user)
  userGameStatics: UserGameStatic[];

  @ManyToOne(() => Role, role => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
