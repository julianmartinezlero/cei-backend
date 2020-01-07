import { Body, Controller, Delete, Get, Param, Request, Post, Put, UseGuards } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { Child } from '../entity/child.entity';
import { ChildService } from './child.service';
import { AuthGuard } from '@nestjs/passport';
import { TutorService } from '../tutor/tutor.service';

@Controller('child')
export class ChildController implements Crud {
  constructor(private readonly childService: ChildService,
              private readonly tutorService: TutorService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  all(): Promise<Child[]> {
    return this.childService.all();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() child: Child) {
    const t: Child = {
      id: null,
      name: child.name,
      lastName: child.lastName,
      ci: child.ci,
      birthDate: child.birthDate,
      sex: child.sex,
      createdAt: new Date(),
      updatedAt: new Date(),
      professional: child.professional,
      photo: child.photo,
      tests: null,
    };
    return this.childService.create(t);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  show(@Param() params) {
    return this.childService.show(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param() params, @Body() child: Child) {
    const w = {
      name: child.name,
      lastName: child.lastName,
      ci: child.ci,
      // birthDate: child.birthDate,
      // sex: child.sex,
      updatedAt: new Date(),
    };
    return this.childService.update(params.id, w);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() param) {
    return this.childService.delete(param.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('search/:name')
  search(@Param() param) {
    return this.childService.search(param.name);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('ofTutor/all')
  allChildOfTutor(@Request() req) {
    return this.tutorService.searchByUserId(req.user.id).then(res => {
      return this.childService.ofTutor(res.id);
    });
  }
}
