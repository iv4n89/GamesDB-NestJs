import { Global, Module } from '@nestjs/common';
import { CollectionGameAddedEvent } from './CollectionGameAddedEvent';
import { CollectionGameDeletedEvent } from './CollectionGameDeletedEvent';
import { PriceCreatedEvent } from './PriceCreatedEvent';
import { UserCreatedEvent } from './UserCreatedEvent.event';

@Global()
@Module({
  providers: [
    UserCreatedEvent,
    CollectionGameAddedEvent,
    CollectionGameDeletedEvent,
    PriceCreatedEvent,
  ],
  exports: [
    UserCreatedEvent,
    CollectionGameAddedEvent,
    CollectionGameDeletedEvent,
    PriceCreatedEvent,
  ],
})
export class EventsModule {}
