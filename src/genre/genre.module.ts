import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Game } from 'src/game/entities/game.entity';
import { Genre } from './entities/genre.entity';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [TypeOrmModule.forFeature([Genre, Game])],
})
export class GenreModule {}
