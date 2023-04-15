import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConsoleTypeDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
