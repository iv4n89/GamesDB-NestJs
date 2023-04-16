import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/country/entities/country.entity';
import { DeveloperController } from './developer.controller';
import { DeveloperService } from './developer.service';
import { Developer } from './entities/developer.entity';

@Module({
  controllers: [DeveloperController],
  providers: [DeveloperService],
  imports: [TypeOrmModule.forFeature([Developer, Country])],
  exports: [DeveloperService],
})
export class DeveloperModule {}
