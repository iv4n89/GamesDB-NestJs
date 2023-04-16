import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import {
  ConsoleToFollowingDto,
  GameToFollowingDto,
  UpdateFollowingDto,
} from './dto/add-followings.dto';
import { Following } from './entities/following.entity';

@Injectable()
export class FollowingService {
  constructor(
    @InjectRepository(Following)
    private readonly followingRepository: Repository<Following>,
    @InjectRepository(Console)
    private readonly consoleRepository: Repository<Console>,
    @InjectRepository(Game)
    private readonly gameRepository: Repository<Game>,
  ) {}

  findUserFollowings(userId: number) {
    return this.followingRepository.find({
      where: { user: { id: userId } },
      relations: ['console', 'game'],
    });
  }

  async addConsoleToFollowing(
    user: User,
    { console, ...createFollowingDto }: ConsoleToFollowingDto,
  ) {
    const _console: Console = await this.consoleRepository.findOneOrFail({
      where: { id: console },
    });
    const following: Following = this.followingRepository.create({
      user,
      console: _console,
      ...createFollowingDto,
    });

    return this.followingRepository.save(following);
  }

  async deleteConsoleFromFollowing(
    user: User,
    { console }: ConsoleToFollowingDto,
  ) {
    await this.followingRepository.delete({
      console: { id: console },
      user: { id: user.id },
    });
  }

  async addGameToFollowing(
    user: User,
    { game, ...createFollowingDto }: GameToFollowingDto,
  ) {
    const _game: Game = await this.gameRepository.findOneOrFail({
      where: { id: game },
    });
    const following: Following = this.followingRepository.create({
      user,
      game: _game,
      ...createFollowingDto,
    });
    return this.followingRepository.save(following);
  }

  async deleteGameFromFollowing(user: User, { game }: GameToFollowingDto) {
    await this.followingRepository.delete({
      game: { id: game },
      user: { id: user.id },
    });
  }

  async updateFollowing(id: number, { lastPriceAmount }: UpdateFollowingDto) {
    const following: Following = await this.followingRepository.findOneOrFail({
      where: { id },
    });
    if (
      !following.lastPriceAmount ||
      following.lastPriceAmount != lastPriceAmount
    ) {
      following.lastPriceAmount = lastPriceAmount;
      following.lastPriceDate = new Date();
    }

    return this.followingRepository.save(following);
  }
}
