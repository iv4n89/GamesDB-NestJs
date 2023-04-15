import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { Tag } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  create(createTagDto: CreateTagDto) {
    const tag: Tag = this.tagRepository.create(createTagDto);
    return this.tagRepository.save(tag);
  }

  findAll() {
    return this.tagRepository.find();
  }

  async findOne(id: number) {
    const tag: Tag = await this.tagRepository.findOne({ where: { id } });
    if (!tag) {
      const errors = { id: 'Tag seems to not to exist' };
      throw new HttpException(
        { message: 'Tag can not be found', errors },
        HttpStatus.NOT_FOUND,
      );
    }
    return tag;
  }

  async update(id: number, updateTagDto: UpdateTagDto) {
    const tag: Tag = await this.findOne(id);
    Object.assign(tag, updateTagDto);
    return tag;
  }

  remove(id: number) {
    return this.tagRepository.delete(id);
  }
}
