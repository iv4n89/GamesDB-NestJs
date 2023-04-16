import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { AddGame } from './dto/add-delete-games.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Admin } from 'src/auth/roles/role.decorator';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Post()
  create(@Body() createGenreDto: CreateGenreDto) {
    return this.genreService.create(createGenreDto);
  }

  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.findOne(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGenreDto: UpdateGenreDto,
  ) {
    return this.genreService.update(id, updateGenreDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id/add/games')
  addGames(@Param('id', ParseIntPipe) id: number, @Body() { games }: AddGame) {
    return this.genreService.addGames(id, games);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.genreService.remove(id);
  }
}
