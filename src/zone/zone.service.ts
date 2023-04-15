import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateZoneDto } from './dto/create-zone.dto';
import { UpdateZoneDto } from './dto/update-zone.dto';
import { Zone } from './entities/zone.entity';

@Injectable()
export class ZoneService {
  constructor(
    @InjectRepository(Zone)
    private readonly zoneRepository: Repository<Zone>,
  ) {}

  create(createZoneDto: CreateZoneDto) {
    const zone: Zone = this.zoneRepository.create(createZoneDto);
    return this.zoneRepository.save(zone);
  }

  findAll() {
    return this.zoneRepository.find();
  }

  async findOne(id: number) {
    const zone: Zone = await this.zoneRepository.findOne({ where: { id } });
    if (!zone) {
      const errors = { id: 'Zone seems to not to exist' };
      throw new HttpException(
        { message: 'Zone can not be found', errors },
        HttpStatus.NOT_FOUND,
      );
    }
    return zone;
  }

  async update(id: number, updateZoneDto: UpdateZoneDto) {
    const zone: Zone = await this.findOne(id);
    Object.assign(zone, updateZoneDto);
    return zone;
  }

  remove(id: number) {
    return this.zoneRepository.delete({ id });
  }
}
