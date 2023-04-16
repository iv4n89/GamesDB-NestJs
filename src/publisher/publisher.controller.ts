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
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { Admin } from 'src/auth/roles/role.decorator';

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Post()
  create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  findAll() {
    return this.publisherService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.publisherService.findOne(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publisherService.update(id, updatePublisherDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Admin()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.publisherService.remove(id);
  }
}
