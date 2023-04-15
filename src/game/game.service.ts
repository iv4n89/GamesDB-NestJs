import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'src/console/entities/console.entity';
import { Developer } from 'src/developer/entities/developer.entity';
import { Genre } from 'src/genre/entities/genre.entity';
import { Publisher } from 'src/publisher/entities/publisher.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { Zone } from 'src/zone/entities/zone.entity';
import { In, Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(Genre)
    private readonly genreRepository: Repository<Genre>,
    @InjectRepository(Console)
    private readonly consoleRepository: Repository<Console>,
    @InjectRepository(Developer)
    private readonly developerRepository: Repository<Developer>,
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const console: Console = await this.consoleRepository.findOne({
      where: { id: createGameDto?.console },
    });

    if (!console) {
      const errors = { console: 'Console not found' };
      throw new HttpException(
        { message: 'Create game failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const game: Game = this.gameRepository.create({
      ...createGameDto,
      console,
      developer:
        (!!createGameDto?.developer &&
          (await this.developerRepository.findOne({
            where: { id: createGameDto?.developer },
          }))) ||
        undefined,
      genres:
        (!!createGameDto?.genres &&
          (await this.genreRepository.find({
            where: { id: In(createGameDto?.genres) },
          }))) ||
        undefined,
      publisher:
        (!!createGameDto?.publisher &&
          (await this.publisherRepository.findOne({
            where: { id: createGameDto?.publisher },
          }))) ||
        undefined,
      zone:
        (!!createGameDto?.zone &&
          (await this.zoneRepository.findOne({
            where: { id: createGameDto?.zone },
          }))) ||
        undefined,
      tags:
        (!!createGameDto?.tags &&
          (await this.tagRepository.find({
            where: { id: In(createGameDto?.tags) },
          }))) ||
        undefined,
    });
    return this.gameRepository.save(game);
  }

  findAll() {
    return this.gameRepository.find();
  }

  async findOne(id: number) {
    const game: Game = await this.gameRepository.findOne({
      where: { id },
      relations: ['console'],
    });

    if (!game) {
      const errors = { id: 'Game not found' };
      throw new HttpException(
        { message: 'Game seems to not to exist', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    return game;
  }

  async findMany(ids: number[]) {
    return await this.gameRepository.find({ where: { id: In(ids) } });
  }

  async update(id: number, updateGameDto: UpdateGameDto) {
    const game: Game = await this.gameRepository.findOne({
      where: { id },
      relations: ['console'],
    });

    if (!game) {
      const errors = { id: 'Game not found' };
      throw new HttpException(
        { message: 'Game seems to not to exist', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    if (updateGameDto?.console) {
      const console: Console = await this.consoleRepository.findOne({
        where: { id: updateGameDto?.console },
      });

      if (!console) {
        const errors = { console: 'Console can not be found' };
        throw new HttpException(
          { message: 'Update game can not be performed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }

      game.console = console;
      delete updateGameDto.console;
    }

    if (updateGameDto?.developer) {
      const developer: Developer = await this.developerRepository.findOne({
        where: { id: updateGameDto?.developer },
      });
      if (!developer) {
        const errors = { developer: 'Developer can not be found' };
        throw new HttpException(
          { message: 'Update game can not be performed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      game.developer = developer;
      delete updateGameDto.developer;
    }

    if (updateGameDto?.publisher) {
      const publisher: Publisher = await this.publisherRepository.findOne({
        where: { id: updateGameDto?.publisher },
      });
      if (!publisher) {
        const errors = { publisher: 'Publisher can not be found' };
        throw new HttpException(
          { message: 'Updte game can not be performed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      game.publisher = publisher;
      delete updateGameDto.publisher;
    }

    if (updateGameDto?.genres) {
      const genres: Genre[] = await this.genreRepository.find({
        where: { id: In(updateGameDto?.genres) },
      });
      if (genres.some((genre) => genre === null || genre === undefined)) {
        const errors = { genres: 'Any of the genres can not be found' };
        throw new HttpException(
          { message: 'Update game can not be performed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      game.genres = genres;
      delete updateGameDto.genres;
    }

    if (updateGameDto?.zone) {
      const zone: Zone = await this.zoneRepository.findOne({
        where: { id: updateGameDto?.zone },
      });
      if (!zone) {
        const errors = { zone: 'Zone can not be found' };
        throw new HttpException(
          { message: 'Update can not be performed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      game.zone = zone;
      delete updateGameDto.zone;
    }

    if (updateGameDto?.tags) {
      const tags: Tag[] = await this.tagRepository.find({
        where: { id: In(updateGameDto?.tags) },
      });
      if (tags.some((tag) => tag === null || tag === undefined)) {
        const errors = { tag: 'Any of the tags can not be found' };
        throw new HttpException(
          { message: 'Update can not be performed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      game.tags = tags;
      delete updateGameDto.tags;
    }

    Object.assign(game, updateGameDto);
    return await this.gameRepository.save(game);
  }

  remove(id: number) {
    return this.gameRepository.delete({ id });
  }
}
