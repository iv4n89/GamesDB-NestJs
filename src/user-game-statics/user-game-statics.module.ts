import { Module } from '@nestjs/common';
import { UserGameStaticsService } from './user-game-statics.service';
import { UserGameStaticsController } from './user-game-statics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGameStatic } from './entities/user-game-static.entity';
import { User } from 'src/user/entities/user.entity';
import { Game } from 'src/game/entities/game.entity';

@Module({
  controllers: [UserGameStaticsController],
  providers: [UserGameStaticsService],
  imports: [TypeOrmModule.forFeature([UserGameStatic, User, Game])],
})
export class UserGameStaticsModule {}
