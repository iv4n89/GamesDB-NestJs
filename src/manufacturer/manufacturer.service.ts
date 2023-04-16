import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/country/entities/country.entity';
import { Repository } from 'typeorm';
import { CreateManufacturerDto } from './dto/create-manufacturer.dto';
import { UpdateManufacturerDto } from './dto/update-manufacturer.dto';
import { Manufacturer } from './entities/manufacturer.entity';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectRepository(Manufacturer)
    private readonly manufacturerRepository: Repository<Manufacturer>,
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  async create(createManufacturerDto: CreateManufacturerDto) {
    const manufacturer = this.manufacturerRepository.create({
      ...createManufacturerDto,
      country:
        !!createManufacturerDto?.country &&
        (await this.countryRepository.findOne({
          where: { id: createManufacturerDto?.country },
        })),
    });
    return this.manufacturerRepository.save(manufacturer);
  }

  findAll() {
    return this.manufacturerRepository.find();
  }

  async findOne(id: number) {
    const manufacturer: Manufacturer =
      await this.manufacturerRepository.findOne({
        where: { id },
        relations: ['consoles'],
      });

    if (!manufacturer) {
      const errors = { id: 'Manufacturer not found' };
      throw new HttpException(
        { message: 'Manufacturer seems to not to exist', errors },
        HttpStatus.NOT_FOUND,
      );
    }

    return manufacturer;
  }

  async update(id: number, updateManufacturerDto: UpdateManufacturerDto) {
    const manufacturer: Manufacturer = await this.findOne(id);
    Object.assign(manufacturer, updateManufacturerDto);
    return this.manufacturerRepository.save(manufacturer);
  }

  remove(id: number) {
    return this.manufacturerRepository.delete({ id });
  }
}
