import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { InjectRepository } from '@nestjs/typeorm';
import { PriceCreatedEvent } from 'src/events/PriceCreatedEvent';
import { eventNames } from 'src/events/eventNames';
import { PriceDeletedEvent } from 'src/events/PriceDeletedEvent';
import { PriceUpdatedEvent } from 'src/events/PriceUpdatedEvent';
import { Repository } from 'typeorm';
import { Price } from './entities/Price.entity';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(Price)
    private readonly priceRepository: Repository<Price>,
  ) {}

  @OnEvent(eventNames.price.created, { async: true })
  async handlePriceCreated(payload: PriceCreatedEvent) {
    const price: Price = this.priceRepository.create({
      console: payload.props?.console ?? undefined,
      game: payload.props?.game ?? undefined,
      price: payload.props.price,
      currency: payload.props.currency ?? 'dollar',
    });
    await this.priceRepository.save(price);
  }

  @OnEvent(eventNames.price.updated, { async: true })
  async handlePriceUpdated(payload: PriceUpdatedEvent) {
    const price: Price = await this.priceRepository.findOne({
      where: { id: payload.props.priceId },
    });
    price.price = payload.props.price.price;
    if (payload.props.price?.currency) {
      price.currency = payload.props.price.currency;
    }
    await this.priceRepository.save(price);
  }

  @OnEvent(eventNames.console.price.deleted, { async: true })
  async handleDeletePrice(payload: PriceDeletedEvent) {
    await this.priceRepository.delete({ id: payload.props.priceId });
  }
}
