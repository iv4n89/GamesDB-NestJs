interface Props {
  priceId: number;
  price: {
    price: number;
    currency?: string;
  };
}

export class PriceUpdatedEvent {
  constructor(public props: Props) {}
}
