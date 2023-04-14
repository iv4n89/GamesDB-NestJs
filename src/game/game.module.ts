import { forwardRef, Module } from '@nestjs/common';
import { GameService } from './game.service';
import { GameController } from './game.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from './entities/game.entity';
import { ConsoleModule } from 'src/console/console.module';

@Module({
  imports: [TypeOrmModule.forFeature([Game]), forwardRef(() => ConsoleModule)],
  controllers: [GameController],
  providers: [GameService],
  exports: [GameService],
})
export class GameModule {}
