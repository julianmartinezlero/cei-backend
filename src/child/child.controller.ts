import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { Child } from '../entity/child.entity';
import { ChildService } from './child.service';

@Controller('child')
export class ChildController implements Crud {
  constructor(private readonly childService: ChildService) {
  }

  @Get()
  all(): Promise<Child[]> {
    return this.childService.all();
  }

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
      tutor: null,
      tutorId: child.tutorId,
      photo: null,
      tests: null,
    };
    return this.childService.create(t);
  }

  @Get(':id')
  show(@Param() params) {
    return this.childService.show(params.id);
  }

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

  @Delete(':id')
  delete(@Param() param) {
    return this.childService.delete(param.id);
  }

  @Get('search/:name')
  search(@Param() param) {
    return this.childService.search(param.name);
  }
}
