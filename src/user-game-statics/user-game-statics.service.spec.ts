import { Test, TestingModule } from '@nestjs/testing';
import { UserGameStaticsService } from './user-game-statics.service';

describe('UserGameStaticsService', () => {
  let service: UserGameStaticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGameStaticsService],
    }).compile();

    service = module.get<UserGameStaticsService>(UserGameStaticsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
