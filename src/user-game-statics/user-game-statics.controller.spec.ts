import { Test, TestingModule } from '@nestjs/testing';
import { UserGameStaticsController } from './user-game-statics.controller';
import { UserGameStaticsService } from './user-game-statics.service';

describe('UserGameStaticsController', () => {
  let controller: UserGameStaticsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserGameStaticsController],
      providers: [UserGameStaticsService],
    }).compile();

    controller = module.get<UserGameStaticsController>(UserGameStaticsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
