import { forwardRef, Module } from '@nestjs/common';
import { ManufacturerService } from './manufacturer.service';
import { ManufacturerController } from './manufacturer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manufacturer } from './entities/manufacturer.entity';
import { CountryModule } from 'src/country/country.module';
import { Country } from 'src/country/entities/country.entity';

@Module({
  controllers: [ManufacturerController],
  providers: [ManufacturerService],
  imports: [TypeOrmModule.forFeature([Manufacturer, Country])],
  exports: [ManufacturerService],
})
export class ManufacturerModule {}
