import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/country/entities/country.entity';
import { Manufacturer } from './entities/manufacturer.entity';
import { ManufacturerController } from './manufacturer.controller';
import { ManufacturerService } from './manufacturer.service';

@Module({
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  imports: [TypeOrmModule.forFeature([Manufacturer, Country])],
  exports: [ManufacturerService],
})
export class ManufacturerModule {}
