import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/entities/game.entity';
import { In, Repository } from 'typeorm';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}
  async create(createGenreDto: CreateGenreDto) {
    const genre = this.genreRepository.create({
      ...createGenreDto,
      games:
        !!createGenreDto?.games &&
        (await this.gameRepository.find({
          where: { id: In(createGenreDto?.games) },
        })),
    });
    return this.genreRepository.save(genre);
  }

  findAll() {
    return this.genreRepository.find();
  }

  async findOne(id: number) {
    const genre = await this.genreRepository.findOne({
      where: { id },
      relations: ['games'],
    });

    if (!genre) {
      const errors = { id: 'Genre seems to not to exist' };
      throw new HttpException(
        { message: 'Genre can not be found', errors },
        HttpStatus.NOT_FOUND,
      );
    }

    return genre;
  }

  async findMany(ids: number[]) {
    const genres: Genre[] = await this.genreRepository.find({
      where: { id: In(ids) },
    });

    return genres;
  }

  async update(id: number, updateGenreDto: UpdateGenreDto) {
    const genre: Genre = await this.findOne(id);

    if (updateGenreDto.games) {
      const games = [];
      for (const gameId of updateGenreDto.games) {
        const game: Game = await this.gameRepository.findOne({
          where: { id: gameId },
        });
        games.push(game);
      }
      genre.games = [...new Set([...genre.games, ...games])];
      delete updateGenreDto.games;
    }

    Object.assign(genre, updateGenreDto);
    return this.genreRepository.save(genre);
  }

  remove(id: number) {
    return this.genreRepository.delete({ id });
  }
}
