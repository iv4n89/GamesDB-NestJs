import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
// import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService, // private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user: User = await this.userService.login(username);
    if (user && bcrypt.compareSync(pass, user.password)) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    // const payload = { username: user.username, sub: user.id };
    return {
      user,
      // token: this.jwtService.sign(payload),
    };
  }
}
