import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'src/console/entities/console.entity';
import { eventNames } from 'src/events/eventNames';
import { UserCreatedEvent } from 'src/events/UserCreatedEvent.event';
import { Game } from 'src/game/entities/game.entity';
import { In, Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';
import { ConsoleOwn } from './entities/console-own.entity';
import { GameOwn } from './entities/game-own.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @InjectRepository(Console)
    private readonly consoleRepository: Repository<Console>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    @InjectRepository(ConsoleOwn)
    private readonly consoleOwnRepository: Repository<ConsoleOwn>,
    @InjectRepository(GameOwn)
    private readonly gameOwnRepository: Repository<GameOwn>,
  ) {}

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
  }

  @OnEvent(eventNames.user.created, { async: true })
  async handleUserCreatedEvent(payload: UserCreatedEvent) {
    const collection: Collection = this.collectionRepository.create({
      user: payload.props.payload,
    });
    await this.collectionRepository.save(collection);
  }

  findAll() {
    return `This action returns all collection`;
  }

  findOne(id: number) {
    return this.collectionRepository.findOne({ where: { id } });
  }

  findOneByUser(userId: number) {
    return this.collectionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['consoleOwns.console', 'gameOwns.game'],
    });
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    const collection: Collection = await this.findOne(id);

    if (updateCollectionDto?.consoles) {
      delete updateCollectionDto.consoles;
    }

    if (updateCollectionDto?.games) {
      delete updateCollectionDto.games;
    }

    Object.assign(collection, updateCollectionDto);
    return this.collectionRepository.save(collection);
  }

  async addConsoles(userId: number, consoles: number[]) {
    const collection: Collection = await this.collectionRepository.findOne({
      where: { user: { id: userId } },
    });

    const _consoles: ConsoleOwn[] = collection.consoleOwns ?? [];
    const consolesToAdd: Console[] = await this.consoleRepository.find({
      where: { id: In(consoles) },
    });
    const newConsoles: Console[] = [
      ...new Map(
        [...(_consoles?.map((c) => c.console) ?? []), ...consolesToAdd].map(
          (e) => [e.id, e],
        ),
      ).values(),
    ];
    for (const console of newConsoles) {
      if (
        await this.consoleOwnRepository.exist({
          where: { console: { id: console.id } },
        })
      ) {
        continue;
      }
      const cOwn: ConsoleOwn = this.consoleOwnRepository.create({
        collection,
        console,
      });
      await this.consoleOwnRepository.save(cOwn);
    }
  }

  async deleteConsoles(userId: number, consoles: number[]) {
    const collection: Collection = await this.collectionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['consoleOwns.console'],
    });

    collection.consoleOwns
      .filter((c) => consoles.includes(c.console.id))
      .forEach(
        async ({ id }) => await this.consoleOwnRepository.delete({ id }),
      );
  }

  async addGames(userId: number, games: number[]) {
    const collection: Collection = await this.collectionRepository.findOne({
      where: { user: { id: userId } },
    });

    const _games: GameOwn[] = collection.gameOwns ?? [];
    const gamesToAdd: Game[] = await this.gameRepository.find({
      where: { id: In(games) },
    });
    const newGames: Game[] = [
      ...new Map(
        [...(_games?.map((g) => g.game) ?? []), ...gamesToAdd].map((e) => [
          e.id,
          e,
        ]),
      ).values(),
    ];
    for (const game of newGames) {
      if (
        await this.gameOwnRepository.exist({ where: { game: { id: game.id } } })
      ) {
        continue;
      }
      const gOwn: GameOwn = this.gameOwnRepository.create({
        collection,
        game,
      });
      await this.gameOwnRepository.save(gOwn);
    }
  }

  async deleteGames(userId: number, games: number[]) {
    const collection: Collection = await this.collectionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['gameOwns.game'],
    });

    collection.gameOwns
      .filter((g) => games.includes(g.game.id))
      .forEach(async ({ id }) => await this.gameOwnRepository.delete({ id }));
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
