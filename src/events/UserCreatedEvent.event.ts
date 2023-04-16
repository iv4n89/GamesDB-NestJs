import { User } from 'src/user/entities/user.entity';

interface Props {
  userId: number;
  payload: User;
}

export class UserCreatedEvent {
  constructor(public props: Props) {}
}
