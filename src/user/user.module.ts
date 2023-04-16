import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EventsModule } from 'src/events/events.module';
import { Role } from './entities/roles.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Role]), EventsModule],
  controllers: [UserController, RoleController],
  providers: [UserService, RoleService],
  exports: [UserService],
})
export class UserModule {}
