import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Request,
} from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
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
  addConsole(@Body() { consoles }: AddConsoleDto, @Request() req) {
    const user: User = req.user;
    return this.collectionService.addConsoles(user.id, consoles);
  }

  @Patch('delete/consoles')
  deleteConsole(@Body() { consoles }: DeleteConsoleDto, @Request() req) {
    const user: User = req.user;
    return this.collectionService.deleteConsoles(user.id, consoles);
  }

  @Patch('add/games')
  addGames(@Body() { games }: AddGameDto, @Request() req) {
    const user: User = req.user;
    return this.collectionService.addGames(user.id, games);
  }

  @Patch('delete/games')
  deleteGames(@Body() { games }: DeleteGameDto, @Request() req) {
    const user: User = req.user;
    return this.collectionService.deleteGames(user.id, games);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.collectionService.remove(id);
  }
}
