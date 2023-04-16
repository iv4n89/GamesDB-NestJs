import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/country/entities/country.entity';
import { Repository } from 'typeorm';
import { CreateDeveloperDto } from './dto/create-developer.dto';
import { UpdateDeveloperDto } from './dto/update-developer.dto';
import { Developer } from './entities/developer.entity';

@Injectable()
export class DeveloperService {
  constructor(
    @InjectRepository(Developer)
    private readonly developerRepository: Repository<Developer>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createDeveloperDto: CreateDeveloperDto) {
    const developer: Developer = this.developerRepository.create({
      ...createDeveloperDto,
      country:
        !!createDeveloperDto?.country &&
        (await this.countryRepository.findOne({
          where: { id: createDeveloperDto?.country },
        })),
    });
    return this.developerRepository.save(developer);
  }

  findAll() {
    return this.developerRepository.find();
  }

  findOne(id: number) {
    return this.developerRepository.findOne({
      where: { id },
      relations: ['games'],
    });
  }

  async update(id: number, updateDeveloperDto: UpdateDeveloperDto) {
    const developer: Developer = await this.developerRepository.findOne({
      where: { id },
    });

    if (!developer) {
      const errors = { id: 'Developer seems to not to exist' };
      throw new HttpException(
        { message: 'Update can not be performed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(developer, updateDeveloperDto);
    return this.developerRepository.save(developer);
  }

  remove(id: number) {
    return this.developerRepository.delete({ id });
  }
}
