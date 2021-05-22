import { Controller, Post, UseGuards, Request, Get, Body } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../entity/user.entity';
import {getConnection} from 'typeorm';
import {Professional} from '../entity/professional.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UsersService) {
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user).then(a => {
      console.log(a);
      return a;
    });
  }

  // @UseGuards(AuthGuard('local'))
  @Post('register')
  async register(@Body() professional) {
    // const u = new User();
    // u.email = body.email;
    // u.password = body.password;
    // u.updatedAt = new Date();
    // u.createdAt = new Date();

    const query = getConnection().createQueryRunner();
    await query.startTransaction();
    try {
      const user = {
        id: null,
        email: professional.cell,
        username: professional.name + professional.lastName,
        password: professional.ci,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const t = {
        id: null,
        name: professional.name,
        lastName: professional.lastName,
        ci: professional.ci,
        cell: professional.cell,
        // position: professional.position ? professional.position : null,
        // profession: professional.profession ? professional.profession : null,
        // createdAt: new Date(),
        // updatedAt: new Date(),
        user,
      };

      await query.manager.save(User, t.user);
      await query.manager.save(Professional, t);
      await query.commitTransaction();

    // try {
    //   return this.userService.create(u).then(res => {
      return this.authService.login(user);
      // });
    } catch (e) {
      await query.rollbackTransaction();
      return { error: 'already exist' };
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async getProfile(@Request() req) {
    return this.userService.show(req.user.id);
  }
}
