import { Test, TestingModule } from '@nestjs/testing';
import { ConsoleTypeService } from './console-type.service';

describe('ConsoleTypeService', () => {
  let service: ConsoleTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsoleTypeService],
    }).compile();

    service = module.get<ConsoleTypeService>(ConsoleTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
