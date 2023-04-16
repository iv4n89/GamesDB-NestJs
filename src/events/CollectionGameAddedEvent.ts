import { Game } from 'src/game/entities/game.entity';

interface Props {
  collectionId: number;
  game: Game;
  userId: number;
}

export class CollectionGameAddedEvent {
  constructor(public props: Props) {}
}
