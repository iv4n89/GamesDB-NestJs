import { PartialType } from '@nestjs/mapped-types';
import { CreateUserGameStaticDto } from './create-user-game-static.dto';

export class UpdateUserGameStaticDto extends PartialType(CreateUserGameStaticDto) {}
