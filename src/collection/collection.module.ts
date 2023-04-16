import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { Collection } from './entities/collection.entity';
import { ConsoleOwn } from './entities/console-own.entity';
import { Following } from './entities/following.entity';
import { GameOwn } from './entities/game-own.entity';
import { FollowingController } from './following.controller';
import { FollowingService } from './following.service';

@Module({
  controllers: [CollectionController, FollowingController],
  providers: [CollectionService, FollowingService],
  imports: [
    TypeOrmModule.forFeature([
      Collection,
      Console,
      Game,
      ConsoleOwn,
      GameOwn,
      Following,
    ]),
  ],
})
export class CollectionModule {}
