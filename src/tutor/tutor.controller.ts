import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { TutorService } from './tutor.service';
import { Professional } from '../entity/professional.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entity/user.entity';
import { ChildService } from '../child/child.service';
import { Child } from '../entity/child.entity';
import { getConnection } from 'typeorm';
import { UsersService } from '../users/users.service';

@UseGuards(AuthGuard('jwt'))
@Controller('tutor')
export class TutorController implements Crud {
  constructor(private readonly tutorService: TutorService,
              private childService: ChildService,
              private usersService: UsersService) {
  }

  @Get()
  all(): Promise<Professional[]> {
    return this.tutorService.all();
  }

  @Post('create')
  async createTutor(@Body() body) {
    const user = new User();
    user.email = body.email;
    user.password = body.password;

    const tutor = new Professional();
    tutor.name = body.name;
    tutor.lastName = body.lastName;
    tutor.ci = body.ci;
    tutor.cell = body.cell;
    tutor.position = body.position;
    tutor.user = user;

    const children = await this.processChildren(tutor, body.children);
    return getConnection().transaction(async () => {
      return [
        await this.usersService.create(user),
        await this.tutorService.create(tutor),
        await this.childService.create(children),
      ];
    });

  }

  @Post()
  create(@Body() tutor, @Request() req) {
    const t: Professional = {
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

  @Get(':id')
  show(@Param() params) {
    return this.tutorService.show(params.id);
  }

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

  @Delete(':id')
  delete(@Param() params) {
    return this.tutorService.delete(params.id);
  }

  @Get('search/:name')
  search(@Param() param) {
    return this.tutorService.search(param.name);
  }

  async processChildren(professional: Professional, children: Child[]) {
    return children.map(c => {
      const t = { ...c };
      t.professional = professional;
      return t;
    });
  }
}
