import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../entity/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // @UseGuards(AuthGuard('local'))
  @Post('register')
  async register(@Body() body) {
    const u = new User();
    u.email = body.email;
    u.password = body.password;
    u.updatedAt = new Date();
    u.createdAt = new Date();
    try {
      return this.userService.create(u).then(res => {
        return this.authService.login(u);
      });
    } catch (e) {
      return { error: 'already exist' };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.show(req.user.id);
  }
}
