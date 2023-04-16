interface Props {
  ids: number[];
}

export class CollectionGameDeletedEvent {
  constructor(public props: Props) {}
}
