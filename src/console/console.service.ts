import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsoleType } from 'src/console-type/entities/console-type.entity';
import { Manufacturer } from 'src/manufacturer/entities/manufacturer.entity';
import { Tag } from 'src/tag/entities/tag.entity';
import { In, Repository } from 'typeorm';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';
import { Console } from './entities/console.entity';

@Injectable()
export class ConsoleService {
  constructor(
    @InjectRepository(Console)
    private readonly consoleRepository: Repository<Console>,
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
    @InjectRepository(ConsoleType)
    private readonly consoleTypeRepository: Repository<ConsoleType>,
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async create(createConsoleDto: CreateConsoleDto) {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id: createConsoleDto?.manufacturer },
    });

    if (!manufacturer) {
      const errors = {
        manufacturer: 'Manufacturer is needed to create a console',
      };
      throw new HttpException(
        { message: 'Create console has failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const console = this.consoleRepository.create({
      ...createConsoleDto,
      manufacturer,
      type:
        !!createConsoleDto?.type &&
        (await this.consoleTypeRepository.findOne({
          where: { id: createConsoleDto?.type },
        })),
      tags:
        !!createConsoleDto?.tags &&
        (await this.tagRepository.find({
          where: { id: In(createConsoleDto?.tags) },
        })),
    });
    return this.consoleRepository.save(console);
  }

  findAll() {
    return this.consoleRepository.find();
  }

  findOne(id: number) {
    return this.consoleRepository.findOne({
      where: { id },
      relations: ['games', 'manufacturer'],
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

    if (updateConsoleDto?.manufacturer) {
      const manufacturer: Manufacturer =
        await this.manufacturerRepository.findOne({
          where: { id: updateConsoleDto?.manufacturer },
        });
      if (!manufacturer) {
        const errors = { manufacturer: 'Manufacturer seems to not to exist' };
        throw new HttpException(
          { message: 'Update can not be processed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      console.manufacturer = manufacturer;
      delete updateConsoleDto.manufacturer;
    }

    if (updateConsoleDto?.type) {
      const type: ConsoleType = await this.consoleTypeRepository.findOne({
        where: { id: updateConsoleDto?.type },
      });
      if (!type) {
        const errors = { type: 'ConsoleType seems to not to exist' };
        throw new HttpException(
          { message: 'Update can not be processed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      console.type = type;
      delete updateConsoleDto.type;
    }

    if (updateConsoleDto?.tags) {
      const tags: Tag[] = await this.tagRepository.find({
        where: { id: In(updateConsoleDto?.tags) },
      });
      if (tags.some((tag) => tag === null || tag === undefined)) {
        const errors = { tag: 'Any of the tags can not be found' };
        throw new HttpException(
          { message: 'Update can not be performed', errors },
          HttpStatus.BAD_REQUEST,
        );
      }
      console.tags = tags;
      delete updateConsoleDto.tags;
    }

    Object.assign(console, updateConsoleDto);
    return await this.consoleRepository.save(console);
  }

  remove(id: number) {
    return this.consoleRepository.delete({ id });
  }
}
