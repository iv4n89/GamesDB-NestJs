import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Collection } from 'src/collection/entities/collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Collection])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
