import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { ConsoleTypeService } from './console-type.service';
import { CreateConsoleTypeDto } from './dto/create-console-type.dto';
import { UpdateConsoleTypeDto } from './dto/update-console-type.dto';

@Controller('console-type')
export class ConsoleTypeController {
  constructor(private readonly consoleTypeService: ConsoleTypeService) {}

  @Post()
  create(@Body() createConsoleTypeDto: CreateConsoleTypeDto) {
    return this.consoleTypeService.create(createConsoleTypeDto);
  }

  @Get()
  findAll() {
    return this.consoleTypeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.consoleTypeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConsoleTypeDto: UpdateConsoleTypeDto,
  ) {
    return this.consoleTypeService.update(id, updateConsoleTypeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consoleTypeService.remove(id);
  }
}
