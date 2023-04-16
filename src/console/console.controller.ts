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
import { DeleteTag } from 'src/game/dto/add-delete-tag.dto';
import { ConsoleService } from './console.service';
import { AddTag } from './dto/add-delete-tags.dto';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsolePriceDto } from './dto/update-console-price.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';

@Controller('console')
export class ConsoleController {
  constructor(private readonly consoleService: ConsoleService) {}

  @Post()
  create(@Body() createConsoleDto: CreateConsoleDto) {
    return this.consoleService.create(createConsoleDto);
  }

  @Get()
  findAll() {
    return this.consoleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.consoleService.findOne(id);
  }

  @Get(':id/prices')
  findConsolePrices(@Param('id', ParseIntPipe) id: number) {
    return this.consoleService.getAllConsolePrices(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConsoleDto: UpdateConsoleDto,
  ) {
    return this.consoleService.update(id, updateConsoleDto);
  }

  @Patch('price/:id/update')
  updatePrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() price: UpdateConsolePriceDto,
  ) {
    return this.consoleService.updateConsolePrice(id, price);
  }

  @Delete('price/:id/delete')
  deletePrice(@Param('id', ParseIntPipe) id: number) {
    return this.consoleService.deleteConsolePrice(id);
  }

  @Patch(':id/add/tags')
  addTags(@Param('id', ParseIntPipe) id: number, @Body() { tags }: AddTag) {
    return this.consoleService.addTags(id, tags);
  }

  @Patch(':id/delete/tags')
  deleteTags(
    @Param('id', ParseIntPipe) id: number,
    @Body() { tags }: DeleteTag,
  ) {
    return this.consoleService.deleteTags(id, tags);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consoleService.remove(id);
  }
}
