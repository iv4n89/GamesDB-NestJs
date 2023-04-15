import { PartialType } from '@nestjs/mapped-types';
import { CreateConsoleTypeDto } from './create-console-type.dto';

export class UpdateConsoleTypeDto extends PartialType(CreateConsoleTypeDto) {}
