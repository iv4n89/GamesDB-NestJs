import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsoleService } from 'src/console/console.service';
import { Console } from 'src/console/entities/console.entity';
import { Repository } from 'typeorm';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
    private readonly consoleService: ConsoleService,
  ) {}

  async create(createGameDto: CreateGameDto) {
    const console: Console = await this.consoleService.findOne(
      createGameDto.console,
    );

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

    if (updateGameDto.console) {
      const console: Console = await this.consoleService.findOne(
        updateGameDto.console,
      );

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

    Object.assign(game, updateGameDto);
    return await this.gameRepository.save(game);
  }

  remove(id: number) {
    return this.gameRepository.delete({ id });
  }
}
