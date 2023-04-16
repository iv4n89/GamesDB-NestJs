import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Admin } from 'src/auth/roles/role.decorator';
import { AddTag, DeleteTag } from './dto/add-delete-tag.dto';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGamePriceDto } from './dto/update-game-price.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameService } from './game.service';

@Controller('game')
export class GameController {
  constructor(private readonly gameService: GameService) {}

  @UseGuards(AuthenticatedGuard)
  @Admin()
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

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGameDto: UpdateGameDto,
  ) {
    return this.gameService.update(id, updateGameDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch('price/:id/update')
  updatePrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() price: UpdateGamePriceDto,
  ) {
    return this.gameService.updateGamePrice(id, price);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Delete('price/:id/delete')
  deletePrice(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.deleteGamePrice(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id/add/tags')
  addTags(@Param('id', ParseIntPipe) id: number, @Body() { tags }: AddTag) {
    return this.gameService.addTags(id, tags);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id/delete/tags')
  deleteTags(
    @Param('id', ParseIntPipe) id: number,
    @Body() { tags }: DeleteTag,
  ) {
    return this.gameService.deleteTags(id, tags);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.gameService.remove(id);
  }
}
