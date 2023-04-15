import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'src/console/entities/console.entity';
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
  ) {}

  create(createCollectionDto: CreateCollectionDto) {
    return 'This action adds a new collection';
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
    });
  }

  async update(id: number, updateCollectionDto: UpdateCollectionDto) {
    const collection: Collection = await this.findOne(id);

    if (updateCollectionDto?.consoles) {
      const consoles: Console[] = await this.consoleRepository.find({
        where: { id: In(updateCollectionDto?.consoles) },
      });

      if (
        consoles.some((console) => console === null || console === undefined)
      ) {
        const errors = { console: 'Any of the console could not be found' };
        throw new HttpException(
          { message: 'Update can not be performed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }

      collection.consoles = consoles;
      delete updateCollectionDto.consoles;
    }

    if (updateCollectionDto?.games) {
      const games: Game[] = await this.gameRepository.find({
        where: { id: In(updateCollectionDto?.games) },
      });

      if (games.some((game) => game === null || game === undefined)) {
        const errors = { game: 'Any of the games could not be found' };
        throw new HttpException(
          { message: 'Update can not be performed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }

      collection.games = games;
      delete updateCollectionDto.games;
    }

    Object.assign(collection, updateCollectionDto);
    return this.collectionRepository.save(collection);
  }

  remove(id: number) {
    return `This action removes a #${id} collection`;
  }
}
