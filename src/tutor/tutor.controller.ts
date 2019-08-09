import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { TutorService } from './tutor.service';
import { Tutor } from '../entity/tutor.entity';

@Controller('tutor')
export class TutorController implements Crud {
  constructor(private readonly tutorService: TutorService) {}

  @Get()
  all(): Promise<Tutor[]> {
    return this.tutorService.all();
  }

  @Post()
  create(@Body() tutor: Tutor) {
    const t: Tutor = {
      id: null,
      name: tutor.name,
      lastName: tutor.lastName,
      ci: tutor.ci,
      cell: tutor.cell,
      email: tutor.email,
      password: tutor.password,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.tutorService.create(t);
  }

  @Get(':id')
  show(@Param() params) {
    return this.tutorService.show(params.id);
  }

  @Put(':id')
  update(@Param() params, @Body() tutor: Tutor) {
    const w = {
      name: tutor.name,
      lastName: tutor.lastName,
      ci: tutor.ci,
      cell: tutor.cell,
      email: tutor.email,
      password: tutor.password,
      updatedAt: new Date(),
    };
    return this.tutorService.update(params.id, w);
  }

  @Delete()
  delete(id: any) {
    return this.tutorService.delete(id);
  }

  @Get('search/:name')
  search(@Param() param) {
    return this.tutorService.search(param.name);
  }
}
