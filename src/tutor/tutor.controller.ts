import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { TutorService } from './tutor.service';
import { ChildService } from '../child/child.service';
import { Professional } from '../entity/professional.entity';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('tutor')
export class TutorController implements Crud {
  constructor(private readonly tutorService: TutorService,
              private readonly userService: UsersService,
              private readonly childService: ChildService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  all(): Promise<Professional[]> {
    return this.tutorService.all();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() tutor, @Request() req) {
    const t = {
      id: null,
      name: tutor.name,
      lastName: tutor.lastName,
      ci: tutor.ci,
      cell: tutor.cell,
      position: tutor.position,
      profession: tutor.profession,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: req.user,
    };
    return this.tutorService.create(t);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  show(@Param() params) {
    return this.tutorService.show(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param() params, @Body() tutor) {
    const w = {
      name: tutor.name,
      lastName: tutor.lastName,
      ci: tutor.ci,
      cell: tutor.cell,
      updatedAt: new Date(),
    };
    return this.tutorService.update(params.id, w);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() params) {
    return this.tutorService.delete(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('search/:name')
  search(@Param() param) {
    return this.tutorService.search(param.name);
  }
}
