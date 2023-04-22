import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Admin } from 'src/auth/roles/role.decorator';
import { DeleteTag } from 'src/game/dto/add-delete-tag.dto';
import { User } from 'src/user/entities/user.entity';
import { ConsoleService } from './console.service';
import { AddTag } from './dto/add-delete-tags.dto';
import { CreateConsoleDto } from './dto/create-console.dto';
import { UpdateConsolePriceDto } from './dto/update-console-price.dto';
import { UpdateConsoleDto } from './dto/update-console.dto';

@Controller('console')
export class ConsoleController {
  constructor(private readonly consoleService: ConsoleService) {}

  @UseGuards(AuthenticatedGuard)
  @Admin()
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

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConsoleDto: UpdateConsoleDto,
  ) {
    return this.consoleService.update(id, updateConsoleDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch('price/:id/update')
  updatePrice(
    @Param('id', ParseIntPipe) id: number,
    @Body() price: UpdateConsolePriceDto,
  ) {
    return this.consoleService.updateConsolePrice(id, price);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Delete('price/:id/delete')
  deletePrice(@Param('id', ParseIntPipe) id: number) {
    return this.consoleService.deleteConsolePrice(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id/add/tags')
  addTags(@Param('id', ParseIntPipe) id: number, @Body() { tags }: AddTag) {
    return this.consoleService.addTags(id, tags);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id/delete/tags')
  deleteTags(
    @Param('id', ParseIntPipe) id: number,
    @Body() { tags }: DeleteTag,
  ) {
    return this.consoleService.deleteTags(id, tags);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consoleService.remove(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/favorite')
  addFavorite(@Param('id', ParseIntPipe) id: number, @Request() { user }) {
    return this.consoleService.addConsoleToFavorite(id, user);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id/favorite')
  deleteFavorite(@Param('id', ParseIntPipe) id: number, @Request() { user }) {
    return this.consoleService.deleteConsoleFromFavorites(id, user);
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id/wanted')
  addWanted(@Param('id', ParseIntPipe) id: number, @Request() { user }) {
    return this.consoleService.addConsoleToWanted(id, user);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id/wanted')
  deleteWanted(@Param('id', ParseIntPipe) id: number, @Request() { user }) {
    return this.consoleService.deleteConsoleFromWanted(id, user);
  }
}
