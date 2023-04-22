import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from 'typeorm';
import { CommonService } from './common.service';
import { Favorite } from './entities/Favorites.entity';
import { Price } from './entities/Price.entity';
import { Wanted } from './entities/Wanted.entity';

@Global()
@Module({
  providers: [BaseEntity, Price, CommonService],
  exports: [BaseEntity, Price],
  imports: [TypeOrmModule.forFeature([Price, Wanted, Favorite])],
})
export class CommonModule {}
