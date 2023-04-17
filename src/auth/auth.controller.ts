import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOkResponse({
    description:
      'The login process has been successful, user has generated a new session in the server',
    type: User,
  })
  @ApiUnauthorizedResponse({
    description:
      'The login process failed as the username or password could not be validated',
  })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOkResponse({
    description: 'The user is logged in and he/she got the user profile',
    type: User,
  })
  @ApiForbiddenResponse({
    description: 'No user session found, the user can not access this data',
  })
  @UseGuards(AuthenticatedGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
