import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsoleTypeDto } from './dto/create-console-type.dto';
import { UpdateConsoleTypeDto } from './dto/update-console-type.dto';
import { ConsoleType } from './entities/console-type.entity';

@Injectable()
export class ConsoleTypeService {
  constructor(
    @InjectRepository(ConsoleType)
    private readonly consoleTypeRepository: Repository<ConsoleType>,
  ) {}

  create(createConsoleTypeDto: CreateConsoleTypeDto) {
    const type: ConsoleType =
      this.consoleTypeRepository.create(createConsoleTypeDto);
    return this.consoleTypeRepository.save(type);
  }

  findAll() {
    return this.consoleTypeRepository.find();
  }

  async findOne(id: number) {
    const type: ConsoleType = await this.consoleTypeRepository.findOne({
      where: { id },
    });
    if (!type) {
      const errors = { id: 'Console type seems to not to exist' };
      throw new HttpException(
        { message: 'Console type can not be found', errors },
        HttpStatus.NOT_FOUND,
      );
    }
    return type;
  }

  async update(id: number, updateConsoleTypeDto: UpdateConsoleTypeDto) {
    const type: ConsoleType = await this.findOne(id);
    Object.assign(type, updateConsoleTypeDto);
    return this.consoleTypeRepository.save(type);
  }

  remove(id: number) {
    return this.consoleTypeRepository.delete({ id });
  }
}
