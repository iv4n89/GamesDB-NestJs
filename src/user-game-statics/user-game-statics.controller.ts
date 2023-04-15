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
import { UserGameStaticsService } from './user-game-statics.service';
import { CreateUserGameStaticDto } from './dto/create-user-game-static.dto';
import { UpdateUserGameStaticDto } from './dto/update-user-game-static.dto';

@Controller('user-game-statics')
export class UserGameStaticsController {
  constructor(
    private readonly userGameStaticsService: UserGameStaticsService,
  ) {}

  @Post()
  create(@Body() createUserGameStaticDto: CreateUserGameStaticDto) {
    return this.userGameStaticsService.create(createUserGameStaticDto);
  }

  @Get()
  findAll() {
    return this.userGameStaticsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userGameStaticsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserGameStaticDto: UpdateUserGameStaticDto,
  ) {
    return this.userGameStaticsService.update(id, updateUserGameStaticDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userGameStaticsService.remove(id);
  }
}