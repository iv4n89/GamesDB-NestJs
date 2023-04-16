import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Admin } from 'src/auth/roles/role.decorator';
import { ConsoleTypeService } from './console-type.service';
import { CreateConsoleTypeDto } from './dto/create-console-type.dto';
import { UpdateConsoleTypeDto } from './dto/update-console-type.dto';

@Controller('console-type')
export class ConsoleTypeController {
  constructor(private readonly consoleTypeService: ConsoleTypeService) {}

  @UseGuards(AuthenticatedGuard)
  @Admin()
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

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateConsoleTypeDto: UpdateConsoleTypeDto,
  ) {
    return this.consoleTypeService.update(id, updateConsoleTypeDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.consoleTypeService.remove(id);
  }
}
