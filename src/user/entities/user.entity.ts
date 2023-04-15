import { Collection } from 'src/collection/entities/collection.entity';
import { UserGameStatic } from 'src/user-game-statics/entities/user-game-static.entity';
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

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

  @Column('varchar', { select: false })
  password: string;

  @OneToOne(() => Collection, (collection) => collection.user)
  collection: Collection;

  @OneToMany(() => UserGameStatic, (gameStatic) => gameStatic.user)
  userGameStatics: UserGameStatic[];
}
