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
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { AddTag, DeleteTag } from './dto/add-delete-tag.dto';
import { UpdateGamePriceDto } from './dto/update-game-price.dto';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @Post()
  create(@Body() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @Get()
  findAll() {
    return this.gameService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.gameService.findOne(+id);
  }

  @Get(':id/prices')
  findGamePrices(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.getAllGamePrices(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gameService.update(id, updateGameDto);
  }

  @Patch('price/:id/update')
  updatePrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() price: UpdateGamePriceDto,
  ) {
    return this.gameService.updateGamePrice(id, price);
  }

  @Delete('price/:id/delete')
  deletePrice(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.deleteGamePrice(id);
  }

  @Patch(':id/add/tags')
  addTags(@Param('id', ParseIntPipe) id: number, @Body() { tags }: AddTag) {
    return this.gameService.addTags(id, tags);
  }

  @Patch(':id/delete/tags')
  deleteTags(
    @Param('id', ParseIntPipe) id: number,
    @Body() { tags }: DeleteTag,
  ) {
    return this.gameService.deleteTags(id, tags);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.remove(id);
  }
}
