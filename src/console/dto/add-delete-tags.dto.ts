import { IsNotEmpty } from 'class-validator';

export class AddTag {
  @IsNotEmpty()
  tags: number[];
}

export class DeleteTags {
  @IsNotEmpty()
  tags: number[];
}
