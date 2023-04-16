import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RolesGuard } from './auth/roles/roles.guard';
import { CollectionModule } from './collection/collection.module';
import { CommonModule } from './common/common.module';
import configuration from './config/configuration';
import { ConsoleTypeModule } from './console-type/console-type.module';
import { ConsoleModule } from './console/console.module';
import { CountryModule } from './country/country.module';
import { DeveloperModule } from './developer/developer.module';
import { EventsModule } from './events/events.module';
import { GameModule } from './game/game.module';
import { GenreModule } from './genre/genre.module';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { PublisherModule } from './publisher/publisher.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { ZoneModule } from './zone/zone.module';

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
    EventsModule,
    CommonModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
