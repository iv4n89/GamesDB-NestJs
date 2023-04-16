import { Console } from 'src/console/entities/console.entity';
import { Game } from 'src/game/entities/game.entity';

interface Props {
  console?: Console;
  game?: Game;
  price: number;
  currency?: string;
}

export class PriceCreatedEvent {
  constructor(public props: Props) {}
}
