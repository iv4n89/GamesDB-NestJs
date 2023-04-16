import { Injectable } from '@nestjs/common';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'src/console/entities/console.entity';
import { CollectionGameAddedEvent } from 'src/events/CollectionGameAddedEvent';
import { CollectionGameDeletedEvent } from 'src/events/CollectionGameDeletedEvent';
import { eventNames } from 'src/events/eventNames';
import { UserCreatedEvent } from 'src/events/UserCreatedEvent.event';
import { Game } from 'src/game/entities/game.entity';
import { In, Repository } from 'typeorm';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { Collection } from './entities/collection.entity';

@Injectable()
export class CollectionService {
  constructor(
    @InjectRepository(Collection)
    private readonly collectionRepository: Repository<Collection>,
    @InjectRepository(Console)
    private readonly consoleRepository: Repository<Console>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly eventsEmitter: EventEmitter2,
  ) { }

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
      relations: ['consoles', 'games'],
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

    const _consoles: Console[] = collection.consoles;
    const consolesToAdd: Console[] = await this.consoleRepository.find({
      where: { id: In(consoles) },
    });
    const newConsoles = [
      ...new Map(
        [...(_consoles ?? []), ...consolesToAdd].map((e) => [e.id, e]),
      ).values(),
    ];
    collection.consoles = newConsoles;
    return this.collectionRepository.save(collection);
  }

  async deleteConsoles(userId: number, consoles: number[]) {
    const collection: Collection = await this.collectionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['consoles'],
    });

    const _consoles: Console[] = collection.consoles.filter(
      (c) => !consoles.includes(c.id),
    );
    collection.consoles = _consoles;
    return this.collectionRepository.save(collection);
  }

  async addGames(userId: number, games: number[]) {
    const collection: Collection = await this.collectionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['games.userGameStatics'],
    });

    const _games: Game[] = collection.games;
    const gamesToAdd: Game[] = await this.gameRepository.find({
      where: { id: In(games) },
    });
    for (const game of gamesToAdd) {
      this.eventsEmitter.emit(
        eventNames.collection.add.game,
        new CollectionGameAddedEvent({
          collectionId: collection.id,
          userId: userId,
          game,
        }),
      );
    }
    const newGames: Game[] = [
      ...new Map(
        [...(_games ?? []), ...gamesToAdd].map((e) => [e.id, e]),
      ).values(),
    ];
    collection.games = newGames;
    return this.collectionRepository.save(collection);
  }

  async deleteGames(userId: number, games: number[]) {
    const collection: Collection = await this.collectionRepository.findOne({
      where: { user: { id: userId } },
      relations: ['games.userGameStatics'],
    });

    this.eventsEmitter.emit(
      eventNames.collection.delete.games,
      new CollectionGameDeletedEvent({
        ids: collection.games
          .filter(g => games.includes(g.id))
          .map((g) => g.userGameStatics)
          .filter((gs) => gs.length)
          .flatMap((gs) => gs.map((e) => e.id)),
      }),
    );

    const _games: Game[] = collection.games.filter(
      (g) => !games.includes(g.id),
    );

    collection.games = _games;
    return this.collectionRepository.save(collection);
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
