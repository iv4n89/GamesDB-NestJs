import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'src/console/entities/console.entity';
import { Developer } from 'src/developer/entities/developer.entity';
import { eventNames } from 'src/events/eventNames';
import { PriceCreatedEvent } from 'src/events/PriceCreatedEvent';
import { PriceDeletedEvent } from 'src/events/PriceDeletedEvent';
import { PriceUpdatedEvent } from 'src/events/PriceUpdatedEvent';
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
    private readonly eventEmitter: EventEmitter2,
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
    const _game: Game = await this.gameRepository.save(game);

    if (createGameDto?.price) {
      this.eventEmitter.emit(
        eventNames.game.price.created,
        new PriceCreatedEvent({
          game: _game,
          price: createGameDto?.price.price,
          currency: createGameDto?.price?.currency,
        }),
      );
    }

    return _game;
  }

  findAll() {
    return this.gameRepository.find({ relations: ['tags'] });
  }

  findOne(id: number) {
    return this.gameRepository.findOneOrFail({
      where: { id },
      relations: ['console', 'tags', 'prices'],
    });
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

    if (updateGameDto?.price) {
      if (updateGameDto?.price) {
        this.eventEmitter.emit(
          eventNames.price.created,
          new PriceCreatedEvent({
            game,
            price: updateGameDto?.price.price,
            currency: updateGameDto?.price?.currency,
          }),
        );
      }

      delete updateGameDto.price;
    }

    Object.assign(game, updateGameDto);
    return await this.gameRepository.save(game);
  }

  updateGamePrice(
    priceId: number,
    price: { price: number; currency?: string },
  ) {
    this.eventEmitter.emit(
      eventNames.price.updated,
      new PriceUpdatedEvent({
        priceId,
        price,
      }),
    );
  }

  deleteGamePrice(priceId: number) {
    this.eventEmitter.emit(
      eventNames.console.price.deleted,
      new PriceDeletedEvent({
        priceId,
      }),
    );
  }

  async getAllGamePrices(id: number) {
    const game: Game = await this.gameRepository.findOneOrFail({
      where: { id },
      relations: ['prices'],
    });
    return game.prices;
  }

  async addTags(id: number, tags: number[]) {
    const game: Game = await this.gameRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!game) {
      const errors = { id: 'Game could not be found' };
      throw new HttpException(
        { message: 'Could not add tags to game', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const _tags: Tag[] = await this.tagRepository.find({
      where: { id: In(tags) },
    });
    if (_tags.some((t) => !tags.includes(t.id))) {
      const errors = { tags: 'Any of the tags could not be found' };
      throw new HttpException(
        { message: 'Could not add tags to game', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newTags: Tag[] = [
      ...new Map(
        [...(game.tags ?? []), ..._tags].map((e) => [e.id, e]),
      ).values(),
    ];
    game.tags = newTags;
    return this.gameRepository.save(game);
  }

  async deleteTags(id: number, tags: number[]) {
    const game: Game = await this.gameRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!game) {
      const errors = { id: 'Game could not be found' };
      throw new HttpException(
        { message: 'Could not delete tags from game', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const _tags: Tag[] = game.tags.filter((t) => !tags.includes(t.id));
    game.tags = _tags;
    return this.gameRepository.save(game);
  }

  remove(id: number) {
    return this.gameRepository.delete({ id });
  }
}
