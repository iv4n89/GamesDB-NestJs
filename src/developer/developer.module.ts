import { forwardRef, Module } from '@nestjs/common';
import { DeveloperService } from './developer.service';
import { DeveloperController } from './developer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Developer } from './entities/developer.entity';
import { CountryModule } from 'src/country/country.module';
import { Country } from 'src/country/entities/country.entity';

@Module({
  controllers: [DeveloperController],
  providers: [DeveloperService],
  imports: [TypeOrmModule.forFeature([Developer, Country])],
  exports: [DeveloperService],
})
export class DeveloperModule {}
