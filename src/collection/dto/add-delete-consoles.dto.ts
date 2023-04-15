import { IsNotEmpty, IsOptional } from 'class-validator';

export class AddConsoleDto {
  @IsNotEmpty()
  consoles: number[];

  @IsOptional()
  userId: number;
}

export class DeleteConsoleDto {
  @IsNotEmpty()
  consoles: number[];

  @IsOptional()
  userId: number;
}
