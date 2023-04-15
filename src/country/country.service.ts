import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country } from './entities/country.entity';

@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>,
  ) {}

  create(createCountryDto: CreateCountryDto) {
    const country = this.countryRepository.create(createCountryDto);
    return this.countryRepository.save(country);
  }

  findAll() {
    return this.countryRepository.find();
  }

  findOne(id: number) {
    const country = this.countryRepository.findOne({ where: { id } });

    if (!country) {
      const errors = { id: 'Country seems to not to exist' };
      throw new HttpException(
        { message: 'Country can not be found', errors },
        HttpStatus.NOT_FOUND,
      );
    }

    return country;
  }

  async update(id: number, updateCountryDto: UpdateCountryDto) {
    const country: Country = await this.countryRepository.findOne({
      where: { id },
    });

    if (!country) {
      const errors = { id: 'Country seems to not to exist' };
      throw new HttpException(
        { message: 'Country update can no be performed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    Object.assign(country, updateCountryDto);
    return this.countryRepository.save(country);
  }

  remove(id: number) {
    return `This action removes a #${id} country`;
  }
}
