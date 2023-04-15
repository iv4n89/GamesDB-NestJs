import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';

@Module({
  controllers: [ZoneController],
  providers: [ZoneService],
  imports: [TypeOrmModule.forFeature([Zone])],
})
export class ZoneModule {}
