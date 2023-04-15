import { Test, TestingModule } from '@nestjs/testing';
import { ConsoleTypeController } from './console-type.controller';
import { ConsoleTypeService } from './console-type.service';

describe('ConsoleTypeController', () => {
  let controller: ConsoleTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConsoleTypeController],
      providers: [ConsoleTypeService],
    }).compile();

    controller = module.get<ConsoleTypeController>(ConsoleTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
