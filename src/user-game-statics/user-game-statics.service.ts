import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
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
