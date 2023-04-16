import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleType } from 'src/console-type/entities/console-type.entity';
import { EventsModule } from 'src/events/events.module';
import { Game } from 'src/game/entities/game.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { ConsoleController } from './console.controller';
import { ConsoleService } from './console.service';
import { Console } from './entities/console.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Console, Game, Manufacturer, ConsoleType, Tag]),
    EventsModule,
  ],
  controllers: [ConsoleController],
  providers: [ConsoleService],
  exports: [ConsoleService],
})
export class ConsoleModule {}
