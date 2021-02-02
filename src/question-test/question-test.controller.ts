import {Body, Controller, Delete, Get, HttpException, Param, Post, Put, Req, Request, UseGuards} from '@nestjs/common';
import {QuestionTestService} from './question-test.service';
import {Crud} from '../interfaces/crud';
import {Test} from '../entity/test.entity';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from '../users/users.service';
import {ChildService} from '../child/child.service';
import {QuestionTestSolvedService} from './question-test-solved.service';
import {randomId} from '../utils/utils';
import {getConnection, QueryRunner} from 'typeorm';
import {TestQuestionOption} from '../entity/testQuestionOption.entity';
import {ProfessionalService} from '../professional/professional.service';
import {TreatmentService} from '../treatment/treatment.service';
import {Treatment} from '../entity/treatment.entity';
import {TreatmentChild} from '../entity/treatmentChild.entity';

@Controller('question-test')
export class QuestionTestController {
  constructor(private readonly testService: QuestionTestService,
              private readonly questionTestSolved: QuestionTestSolvedService,
              private readonly userService: UsersService,
              private readonly professionalService: ProfessionalService,
              private readonly treatmentService: TreatmentService,
              private readonly childService: ChildService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async all(): Promise<Test[]> {
    return await this.testService.all();
  }

  // @UseGuards(AuthGuard('jwt'))
  // @Post()
  // async create(@Body() test: any, @Request() req) {
  //   const user = await this.userService.show(req.user.id);
  //   const child = await this.childService.show(test.childId);
  //   const t: Test = {
  //       id: null,
  //       code: randomId(),
  //       professional: user.professional,
  //       child,
  //       createdAt: new Date(),
  //       updatedAt: new Date(),
  //       questionState: false,
  //       totalValue: test.totalValue,
  //       testResults: null,
  //     };
  //   return this.testService.create(t).then(r => {
  //         return t;
  //   });
  // }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(@Param() params) {
    return await this.testService.show(Number(params.id));
  }
  //
  // @UseGuards(AuthGuard('jwt'))
  // @Put(':id')
  // update(@Param() params, @Body() test: any) {
  //   const t = {
  //     id: test.id,
  //     child: test.child,
  //     code: test.code,
  //     testResults: test.testResults,
  //     questionType: test.questionType,
  //     updatedAt: new Date(),
  //     questionValue: test.questionValue,
  //   };
  //   return this.testService.update(params.id, t);
  // }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() params) {
    return this.testService.delete(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/solved')
  forSolved(@Param() params, @Request() req) {
    return this.testService.getQuestions();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('testChild/:childId')
  async testChild(@Param() params, @Request() req) {
    return await this.testService.testChild(params.childId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('solved/save')
  async solved(@Body() body, @Req() req) {
    const professional = await this.professionalService.findProfessionalByUserId(req.user.id);
    const query = getConnection().createQueryRunner();
    await query.startTransaction();
    try {
      const test = new Test();
      test.code = randomId();
      test.professional =  professional;
      test.child = body.child;
      test.questionState = true;
      test.totalValue = body.totalValue.toFixed(2);
      await query.manager.save(Test, test);
      const solutions = [];
      for (const s of body.solution) {
        s.test = test;
        solutions.push(s);
      }
      await query.manager.save(TestQuestionOption, solutions);
      await this.createTreatment(test, query);
      await query.commitTransaction();
      return {
        message: 'Guardado',
        testResult: await this.testService.show(test.id, query),
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

  async createTreatment(test: Test, query: QueryRunner) {
    const treatments = await this.treatmentService.getTreatments(await this.getRange(test.totalValue));
    for (const treatment of treatments) {
      const t = new TreatmentChild();
      t.treatment = treatment;
      t.test = test;
      await query.manager.save(TreatmentChild, t);
    }
  }

  async getRange(total) {
    if (total >= 0 && total <= 0.69) {
      return 0;
    }
    if (total >= 0.70 && total <= 1.19) {
      return 1;
    }
    if (total >= 1.20 && total <= 1.70) {
      return 2;
    }
    if (total >= 1.71 && total <= 3) {
      return 3;
    }
  }
}
