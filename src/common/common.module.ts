import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from 'typeorm';
import { CommonService } from './common.service';
import { Price } from './entities/Price.entity';

@Global()
@Module({
  providers: [BaseEntity, Price, CommonService],
  exports: [BaseEntity, Price],
  imports: [TypeOrmModule.forFeature([Price])],
})
export class CommonModule {}
