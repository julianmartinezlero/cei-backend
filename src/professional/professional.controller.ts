import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { Professional } from '../entity/professional.entity';
import { Crud } from '../interfaces/crud';
import { ProfessionalService } from './professional.service';

@Controller('professional')
export class ProfessionalController implements Crud {
  constructor(private readonly professionalService: ProfessionalService) {
  }

  @Get()
  all(): Promise<Professional[]> {
    return this.professionalService.all();
  }

  @Post()
  create(@Body() professional: Professional) {
    const t: Professional = {
      id: null,
      name: professional.name,
      lastName: professional.lastName,
      ci: professional.ci,
      cell: professional.cell,
      email: professional.email,
      password: professional.password,
      position: professional.position,
      profession: professional.profession,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return this.professionalService.create(t);
  }

  @Get(':id')
  show(@Param() params) {
    return this.professionalService.show(params.id);
  }

  @Put(':id')
  update(@Param() params, @Body() professional: Professional) {
    const w = {
      name: professional.name,
      lastName: professional.lastName,
      ci: professional.ci,
      cell: professional.cell,
      email: professional.email,
      password: professional.password,
      position: professional.position,
      profession: professional.profession,
      updatedAt: new Date(),
    };
    return this.professionalService.update(params.id, w);
  }

  @Delete(':id')
  delete(@Param() param) {
    return this.professionalService.delete(param.id);
  }

  @Get('search/:name')
  search(@Param() param) {
    return this.professionalService.search(param.name);
  }
}
