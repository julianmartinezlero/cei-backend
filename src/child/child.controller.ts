import {Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Req, Request, UseGuards} from '@nestjs/common';
import {Crud} from '../interfaces/crud';
import {Child} from '../entity/child.entity';
import {ChildService} from './child.service';
import {AuthGuard} from '@nestjs/passport';
import {TutorService} from '../tutor/tutor.service';
import {UsersService} from '../users/users.service';
import {ProfessionalService} from '../professional/professional.service';
import {QuestionTestService} from '../question-test/question-test.service';

@Controller('child')
export class ChildController implements Crud {

  constructor(private readonly childService: ChildService,
              private userService: UsersService,
              private testService: QuestionTestService,
              private professionalService: ProfessionalService,
              private readonly tutorService: TutorService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  all(@Param() params): Promise<any> {
    return this.childService.all();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('inPeriod/solved')
  getInPeriod(@Query() query) {
    return this.childService.findInPeriodTreatment(query.dateIni, query.dateEnd);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() boby, @Req() req) {
    const user = await this.userService.show(req.user.id);
    let professional;

    const exist = await this.childService.findChildByCI(boby.ci);

    if (exist !== undefined) {
      throw new HttpException('Ya se encuentra registrado', 406);
    }

    if (user.professional.position != null) {
      professional = await this.professionalService.show(boby.professionalId);
    } else {
      professional = user.professional;
    }
    const t = new Child();
    t.name = boby.name;
    t.lastName = boby.lastName;
    t.ci = boby.ci;
    t.birthDate = boby.birthDate;
    t.sex = boby.sex;
    t.professional = professional;
    t.photo = boby.photo;
    t.education = boby.education ? boby.education : null;
    return {
      message: 'Registrado',
      data: await this.childService.create(t),
    };
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
      isActive: child.isActive,
      education: child.education,
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
  async allChildOfTutor(@Request() req) {
    const user = await this.userService.show(req.user.id);
    return await this.childService.ofTutor(user.professional.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('childTutor/:tutorId')
  async childOfTutor(@Param() params) {
    const tutor = await this.tutorService.findTutorById(params.tutorId);
    return await this.childService.ofTutor(tutor.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('classification/children')
  async childOfClassification() {
    const a = {
      title: 'Sin Diagnóstico',
      children: [],
    };
    const re = [
      {
        min: 0,
        max: 0.69,
        title: 'Sin Riesgo',
        children: [],
      },
      {
        min: 0.70,
        max: 1.19,
        title: 'Riesgo Leve',
        children: [],
      },
      {
        min: 1.20,
        max: 1.70,
        title: 'Riesgo Moderado',
        children: [],
      },
      {
        min: 1.71,
        max: 3,
        title: 'Riesgo Alto',
        children: [],
      },
    ];

    const children = await this.childService.all();

    for (const child of children) {
      const test = await this.testService.testChild(child.id);
      if (test.length > 0) {
        const testResult = test[0];
        const range = re.find(r => r.min <= testResult.totalValue && r.max >= testResult.totalValue);
        range.children.push(child);
      } else {
        a.children.push(child);
      }
    }
    return [a].concat(re);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('testSummary/children')
  testSummary() {
    return this.childService.childTestSummary();
  }
}
