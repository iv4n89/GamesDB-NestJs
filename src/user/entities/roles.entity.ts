import { BaseEntity } from 'src/common/BaseEntity.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'roles' })
export class Role extends BaseEntity {
  @Column('varchar')
  name: string;

  @Column('int')
  isAdmin: 0 | 1;

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
