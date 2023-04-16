import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { User } from 'src/user/entities/user.entity';
import {
  ConsoleToFollowingDto,
  GameToFollowingDto,
  UpdateFollowingDto,
} from './dto/add-followings.dto';
import { FollowingService } from './following.service';

@Controller('following')
export class FollowingController {
  constructor(private readonly followingService: FollowingService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('user')
  findUserFollowings(@Request() req) {
    const user: User = req.user;
    return this.followingService.findUserFollowings(user.id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('add/console')
  addConsole(
    @Body() consoleFollowingDto: ConsoleToFollowingDto,
    @Request() req,
  ) {
    const user: User = req.user;
    return this.followingService.addConsoleToFollowing(
      user,
      consoleFollowingDto,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post('delete/console')
  deleteConsole(
    @Body() consoleFollowingDto: ConsoleToFollowingDto,
    @Request() req,
  ) {
    const user: User = req.user;
    return this.followingService.deleteConsoleFromFollowing(
      user,
      consoleFollowingDto,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Post('add/game')
  addGame(@Body() gameFollowingDto: GameToFollowingDto, @Request() req) {
    const user: User = req.user;
    return this.followingService.addGameToFollowing(user, gameFollowingDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Post('delete/game')
  deleteGame(@Body() gameFollowingDto: GameToFollowingDto, @Request() req) {
    const user: User = req.user;
    return this.followingService.deleteGameFromFollowing(
      user,
      gameFollowingDto,
    );
  }

  @UseGuards(AuthenticatedGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateFollowing: UpdateFollowingDto,
  ) {
    return this.followingService.updateFollowing(id, updateFollowing);
  }
}
