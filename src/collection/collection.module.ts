import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Console } from 'src/console/entities/console.entity';
import { EventsModule } from 'src/events/events.module';
import { Game } from 'src/game/entities/game.entity';
import { CollectionController } from './collection.controller';
import { CollectionService } from './collection.service';
import { Collection } from './entities/collection.entity';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
  imports: [
    TypeOrmModule.forFeature([Collection, Console, Game]),
  ],
})
export class CollectionModule { }
