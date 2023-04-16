import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConsoleModule } from './console/console.module';
import { GameModule } from './game/game.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { DeveloperModule } from './developer/developer.module';
import { CountryModule } from './country/country.module';
import { GenreModule } from './genre/genre.module';
import { ConsoleTypeModule } from './console-type/console-type.module';
import { PublisherModule } from './publisher/publisher.module';
import { ZoneModule } from './zone/zone.module';
import { TagModule } from './tag/tag.module';
import { CollectionModule } from './collection/collection.module';
import { UserGameStaticsModule } from './user-game-statics/user-game-statics.module';
import configuration from './config/configuration';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { EventsModule } from './events/events.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'db',
      port: 3306,
      username: 'root',
      password: 'secr3t!',
      database: 'GamesDB',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UserModule,
    ConsoleModule,
    GameModule,
    ManufacturerModule,
    DeveloperModule,
    CountryModule,
    GenreModule,
    ConsoleTypeModule,
    PublisherModule,
    ZoneModule,
    TagModule,
    CollectionModule,
    UserGameStaticsModule,
    EventsModule,
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
