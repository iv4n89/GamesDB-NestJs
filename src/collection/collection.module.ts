import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Collection } from './entities/collection.entity';
import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
  imports: [TypeOrmModule.forFeature([Collection, Console, Game])],
})
export class CollectionModule {}
