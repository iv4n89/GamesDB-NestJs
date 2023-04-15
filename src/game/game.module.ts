import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Console } from 'src/console/entities/console.entity';
import { Developer } from 'src/developer/entities/developer.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Zone } from 'src/zone/entities/zone.entity';
import { Game } from './entities/game.entity';
import { GameController } from './game.controller';
import { GameService } from './game.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Game,
      Genre,
      Console,
      Developer,
      Publisher,
      Zone,
      Tag,
    ]),
  ],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
