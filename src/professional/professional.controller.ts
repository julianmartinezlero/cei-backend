import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { Professional } from '../entity/professional.entity';
import { Crud } from '../interfaces/crud';
import { ProfessionalService } from './professional.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('professional')
export class ProfessionalController implements Crud {
  constructor(
    private readonly professionalService: ProfessionalService,
    private readonly userService: UsersService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  all(): Promise<Professional[]> {
    return this.professionalService.all();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() professional: any) {
    const t = {
      id: null,
      name: professional.name,
      lastName: professional.lastName,
      ci: professional.ci,
      cell: professional.cell,
      position: professional.position,
      profession: professional.profession,
      createdAt: new Date(),
      updatedAt: new Date(),
      user: {
        id: null,
        email: professional.email,
        password: professional.password,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    };
    return this.userService.create(t.user).then(result => {
      this.professionalService.create(t).then(res => {
        return res;
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  show(@Param() params) {
    return this.professionalService.show(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param() params, @Body() professional: Professional) {
    const w = {
      name: professional.name,
      lastName: professional.lastName,
      ci: professional.ci,
      cell: professional.cell,
      // email: professional.email,
      // password: professional.password,
      position: professional.position,
      profession: professional.profession,
      updatedAt: new Date(),
    };
    return this.professionalService.update(params.id, w);
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() param) {
    return this.professionalService.delete(param.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('search/:name')
  search(@Param() param) {
    return this.professionalService.search(param.name);
  }
}
