import { IsNotEmpty } from 'class-validator';

export class AddTag {
  @IsNotEmpty()
  tags: number[];
}

export class DeleteTag {
  @IsNotEmpty()
  tags: number[];
}
