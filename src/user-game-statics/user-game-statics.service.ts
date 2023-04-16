import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { CollectionGameAddedEvent } from 'src/events/CollectionGameAddedEvent';
import { CollectionGameDeletedEvent } from 'src/events/CollectionGameDeletedEvent';
import { eventNames } from 'src/events/eventNames';
import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserGameStaticDto } from './dto/create-user-game-static.dto';
import { UpdateUserGameStaticDto } from './dto/update-user-game-static.dto';
import { UserGameStatic } from './entities/user-game-static.entity';

@Injectable()
export class UserGameStaticsService {
  constructor(
    @InjectRepository(UserGameStatic)
    private readonly userGameStaticRepository: Repository<UserGameStatic>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  async create(createUserGameStaticDto: CreateUserGameStaticDto) {
    const userGameStatic: UserGameStatic = this.userGameStaticRepository.create(
      {
        ...createUserGameStaticDto,
        user:
          (!!createUserGameStaticDto?.user &&
            (await this.userRepository.findOne({
              where: { id: createUserGameStaticDto?.user },
            }))) ||
          undefined,
        game:
          (!!createUserGameStaticDto?.game &&
            (await this.gameRepository.findOne({
              where: { id: createUserGameStaticDto?.game },
            }))) ||
          undefined,
      },
    );
    return this.userGameStaticRepository.save(userGameStatic);
  }

  @OnEvent(eventNames.collection.add.game, { async: true })
  async handleGameAddedToCollection(payload: CollectionGameAddedEvent) {
    if (
      !(await this.userGameStaticRepository.exist({
        where: {
          user: { id: payload.props.userId },
          game: { id: payload.props.game.id },
        },
      }))
    ) {
      const userGameStatic = this.userGameStaticRepository.create({
        user: await this.userRepository.findOneOrFail({
          where: { id: payload.props.userId },
        }),
        game: payload.props.game,
      });
      await this.userGameStaticRepository.save(userGameStatic);
    }
  }

  @OnEvent(eventNames.collection.delete.games, { async: true })
  async handleGameDeletedFromCollection(payload: CollectionGameDeletedEvent) {
    await this.userGameStaticRepository.delete({
      id: In(payload.props.ids),
    });
  }

  findAll() {
    return this.userGameStaticRepository.find();
  }

  async findOne(id: number) {
    const userGameStatic: UserGameStatic =
      await this.userGameStaticRepository.findOne({
        where: { id },
        relations: ['user', 'game'],
      });
    if (!userGameStatic) {
      const errors = { id: 'UserGameStatic seems to not to exist' };
      throw new HttpException(
        { message: 'UserGameStatic could not be found', errors },
        HttpStatus.NOT_FOUND,
      );
    }
    return userGameStatic;
  }

  async update(id: number, updateUserGameStaticDto: UpdateUserGameStaticDto) {
    const userGameStatic: UserGameStatic = await this.findOne(id);
    !!updateUserGameStaticDto?.user && delete updateUserGameStaticDto?.user;
    !!updateUserGameStaticDto?.game && delete updateUserGameStaticDto?.game;
    Object.assign(userGameStatic, updateUserGameStaticDto);
    return this.userGameStaticRepository.save(userGameStatic);
  }

  remove(id: number) {
    return this.userGameStaticRepository.delete({ id });
  }
}
