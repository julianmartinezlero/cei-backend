import {Body, Controller, Delete, Get, HttpException, Param, Post, Put, UseGuards} from '@nestjs/common';
import { Professional } from '../entity/professional.entity';
import { Crud } from '../interfaces/crud';
import { ProfessionalService } from './professional.service';
import { UsersService } from '../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import {getConnection} from 'typeorm';
import {User} from '../entity/user.entity';
import {ancestorWhere} from 'tslint';

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
  async create(@Body() professional: any) {
    const query = getConnection().createQueryRunner();
    const exist = await this.professionalService.findProfessionalByCI(professional.ci);

    if (exist !== undefined) {
      throw new HttpException('Ya se encuentra registrado', 406);
    }

    await query.startTransaction();
    try {
      const user = {
          id: null,
          email: professional.email,
          username: professional.name + professional.lastName,
          password: professional.password,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

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
        user,
      };

      await query.manager.save(User, t.user);
      await query.manager.save(Professional, t);
      await query.commitTransaction();
      return {
        message: 'Registrado',
      };
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      await query.rollbackTransaction();
      throw new HttpException('Error', 406);
    } finally {
      await query.release();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  show(@Param() params) {
    return this.professionalService.show(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param() params, @Body() body: Professional) {
    const professional = await this.professionalService.findProfessionalById(params.id);
    professional.name = body.name;
    professional.lastName = body.lastName;
    professional.cell = body.cell;
    professional.position = body.position;
    professional.profession = body.profession;
    return {
      message: 'Actualizado',
      data: await this.professionalService.update(params.id, professional),
    };
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
