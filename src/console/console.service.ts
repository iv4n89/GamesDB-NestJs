import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';
import { Console } from './entities/console.entity';

@Injectable()
export class ConsoleService {
  constructor(
    @InjectRepository(Console)
    private readonly consoleRepository: Repository<Console>,
  ) {}

  create(createConsoleDto: CreateConsoleDto) {
    const console = this.consoleRepository.create(createConsoleDto);
    return this.consoleRepository.save(console);
  }

  findAll() {
    return this.consoleRepository.find();
  }

  findOne(id: number) {
    return this.consoleRepository.findOne({
      where: { id },
      relations: ['games'],
    });
  }

  async update(id: number, updateConsoleDto: UpdateConsoleDto) {
    const console: Console = await this.consoleRepository.findOneBy({ id });

    if (!console) {
      const errors = { id: 'Console not found' };
      throw new HttpException(
        { message: 'Update did not be performed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(console, updateConsoleDto);
    return await this.consoleRepository.save(console);
  }

  remove(id: number) {
    return this.consoleRepository.delete({ id });
  }
}
