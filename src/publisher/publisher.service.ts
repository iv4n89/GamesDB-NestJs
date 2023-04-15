import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { Publisher } from './entities/publisher.entity';

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(Publisher)
    private readonly publisherRepository: Repository<Publisher>,
  ) {}

  create(createPublisherDto: CreatePublisherDto) {
    const publisher: Publisher =
      this.publisherRepository.create(createPublisherDto);
    return this.publisherRepository.save(publisher);
  }

  findAll() {
    return this.publisherRepository.find();
  }

  async findOne(id: number) {
    const publisher: Publisher = await this.publisherRepository.findOne({
      where: { id },
    });
    if (!publisher) {
      const errors = { id: 'Publisher seems to not to exist' };
      throw new HttpException(
        { message: 'Publisher can not be found', errors },
        HttpStatus.NOT_FOUND,
      );
    }
    return publisher;
  }

  async update(id: number, updatePublisherDto: UpdatePublisherDto) {
    const publisher: Publisher = await this.findOne(id);
    Object.assign(publisher, updatePublisherDto);
    return this.publisherRepository.save(publisher);
  }

  remove(id: number) {
    return this.publisherRepository.delete({ id });
  }
}
