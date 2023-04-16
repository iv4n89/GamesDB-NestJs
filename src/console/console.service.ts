import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { ConsoleType } from 'src/console-type/entities/console-type.entity';
import { eventNames } from 'src/events/eventNames';
import { PriceCreatedEvent } from 'src/events/PriceCreatedEvent';
import { PriceDeletedEvent } from 'src/events/PriceDeletedEvent';
import { PriceUpdatedEvent } from 'src/events/PriceUpdatedEvent';
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
    private readonly eventEmitter: EventEmitter2,
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
        (!!createConsoleDto?.type &&
          (await this.consoleTypeRepository.findOne({
            where: { id: createConsoleDto?.type },
          }))) ||
        undefined,
      tags:
        (!!createConsoleDto?.tags &&
          (await this.tagRepository.find({
            where: { id: In(createConsoleDto?.tags) },
          }))) ||
        undefined,
    });

    const _console = await this.consoleRepository.save(console);

    if (createConsoleDto?.price) {
      this.eventEmitter.emit(
        eventNames.price.created,
        new PriceCreatedEvent({
          console: _console,
          price: createConsoleDto?.price.price,
          currency: createConsoleDto?.price?.currency,
        }),
      );
    }

    return _console;
  }

  findAll() {
    return this.consoleRepository.find();
  }

  findOne(id: number) {
    return this.consoleRepository.findOneOrFail({
      where: { id },
      relations: ['games', 'manufacturer', 'prices'],
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
      delete updateConsoleDto.tags;
    }

    if (updateConsoleDto?.price) {
      this.eventEmitter.emit(
        eventNames.price.created,
        new PriceCreatedEvent({
          console,
          price: updateConsoleDto?.price?.price,
          currency: updateConsoleDto?.price?.currency,
        }),
      );
      delete updateConsoleDto.price;
    }

    Object.assign(console, updateConsoleDto);
    return await this.consoleRepository.save(console);
  }

  updateConsolePrice(
    priceId: number,
    price: { price: number; currency?: string },
  ) {
    this.eventEmitter.emit(
      eventNames.price.updated,
      new PriceUpdatedEvent({
        priceId,
        price,
      }),
    );
  }

  deleteConsolePrice(priceId: number) {
    this.eventEmitter.emit(
      eventNames.console.price.deleted,
      new PriceDeletedEvent({
        priceId,
      }),
    );
  }

  async getAllConsolePrices(id: number) {
    const console: Console = await this.consoleRepository.findOneOrFail({
      where: { id },
      relations: ['prices'],
    });
    return console.prices;
  }

  async addTags(id: number, tags: number[]) {
    const console: Console = await this.consoleRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!console) {
      const errors = { id: 'Console could not be found' };
      throw new HttpException(
        { message: 'Add tags to console could not be performed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const _tags: Tag[] = await this.tagRepository.find({
      where: { id: In(tags) },
    });
    if (_tags.some((t) => !tags.includes(t.id))) {
      const errors = { tags: 'Any of the tags could not be found' };
      throw new HttpException(
        { message: 'Add tags to console could not be performed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const newTags: Tag[] = [
      ...new Map(
        [...(console?.tags ?? []), ..._tags].map((e) => [e.id, e]),
      ).values(),
    ];
    console.tags = newTags;
    return this.consoleRepository.save(console);
  }

  async deleteTags(id: number, tags: number[]) {
    const console: Console = await this.consoleRepository.findOne({
      where: { id },
      relations: ['tags'],
    });
    if (!console) {
      const errors = { id: 'Console could not be found' };
      throw new HttpException(
        { message: 'Delete tags to console could not be performed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }
    const _tags: Tag[] = console.tags.filter((t) => !tags.includes(t.id));
    console.tags = _tags;
    return this.consoleRepository.save(console);
  }

  remove(id: number) {
    return this.consoleRepository.delete({ id });
  }
}
