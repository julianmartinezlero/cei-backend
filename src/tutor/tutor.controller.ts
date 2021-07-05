import {Body, Controller, Delete, Get, HttpException, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
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
    const query = getConnection().createQueryRunner();

    const exist = await this.tutorService.findTutorByCI(body.ci);

    if (exist !== undefined) {
      throw new HttpException('Ya se encuentra registrado', 406);
    }

    await query.startTransaction();
    try {
      const user = new User();
      user.email = body.email;
      user.username = body.name + body.lastName,
      user.password = body.password;

      const tutor = new Professional();
      tutor.name = body.name;
      tutor.lastName = body.lastName;
      tutor.ci = body.ci;
      tutor.cell = body.cell;
      tutor.position = body.position;
      tutor.user = user;

      await query.manager.save(User, user);
      await query.manager.save(Professional, tutor);
      await query.commitTransaction();
      return {
        message: 'Guardado',
      };
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      await query.rollbackTransaction();
      throw new HttpException('ya Existe', 406);
    } finally {
      await query.release();
    }
  }

  @Post()
  async create(@Body() tutor, @Request() req) {
    const t: any = {
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
    return {
      message: 'Guardado',
      data: await this.tutorService.create(t),
    };
  }

  @Get(':id')
  show(@Param() params) {
    return this.tutorService.show(params.id);
  }

  @Put(':id')
  async update(@Param() params, @Body() body) {
    const tutor = await this.tutorService.findTutorById(params.id);
    tutor.lastName = body.lastName;
    tutor.name = body.name;
    tutor.cell = body.cell;
    return {
      message: 'Actualizado',
      data: await this.tutorService.update(params.id, tutor),
    };
  }

  @Delete(':id')
  async delete(@Param() params) {
    return {
      message: 'Eliminado',
      data: await this.tutorService.delete(params.id),
    };
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
