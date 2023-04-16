import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Zone } from './entities/zone.entity';
import { ZoneController } from './zone.controller';
import { ZoneService } from './zone.service';

@Module({
  controllers: [ZoneController],
  providers: [ZoneService],
  imports: [TypeOrmModule.forFeature([Zone])],
})
export class ZoneModule {}
