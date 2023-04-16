interface Props {
  priceId: number;
}

export class PriceDeletedEvent {
  constructor(public props: Props) {}
}
