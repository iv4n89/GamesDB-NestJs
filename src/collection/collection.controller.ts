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
import { CollectionService } from './collection.service';
import { AddConsoleDto, DeleteConsoleDto } from './dto/add-delete-consoles.dto';
import { AddGameDto, DeleteGameDto } from './dto/add-delete-games.dto';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.collectionService.findOne(id);
  }

  @Get('user/:id')
  findOneByUser(@Param('id', ParseIntPipe) id: number) {
    return this.collectionService.findOneByUser(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(+id, updateCollectionDto);
  }

  @Patch('add/consoles')
  addConsole(@Body() { consoles, userId }: AddConsoleDto) {
    return this.collectionService.addConsoles(+userId, consoles);
  }

  @Patch('delete/consoles')
  deleteConsole(@Body() { consoles, userId }: DeleteConsoleDto) {
    return this.collectionService.deleteConsoles(+userId, consoles);
  }

  @Patch('add/games')
  addGames(@Body() { games, userId }: AddGameDto) {
    return this.collectionService.addGames(+userId, games);
  }

  @Patch('delete/games')
  deleteGames(@Body() { games, userId }: DeleteGameDto) {
    return this.collectionService.deleteGames(+userId, games);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectionService.remove(id);
  }
}
