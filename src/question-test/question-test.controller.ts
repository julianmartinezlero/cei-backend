import {Body, Controller, Delete, Get, HttpException, Param, Post, Put, Request, UseGuards} from '@nestjs/common';
import {QuestionTestService} from './question-test.service';
import {Crud} from '../interfaces/crud';
import {Test} from '../entity/test.entity';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from '../users/users.service';
import {ChildService} from '../child/child.service';
import {QuestionTestSolvedService} from './question-test-solved.service';
import {randomId} from '../utils/utils';
import {getConnection} from 'typeorm';
import {TestQuestionOption} from '../entity/testQuestionOption.entity';

@Controller('question-test')
export class QuestionTestController implements Crud {
  constructor(private readonly testService: QuestionTestService,
              private readonly questionTestSolved: QuestionTestSolvedService,
              private readonly userService: UsersService,
              private readonly childService: ChildService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async all(): Promise<Test[]> {
    return await this.testService.all();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() test: any, @Request() req) {
    const user = await this.userService.show(req.user.id);
    const child = await this.childService.show(test.childId);
    // .then((chi: Child) => {
    const t: Test = {
      id: null,
      code: randomId(),
      professional: user.professional,
      child,
      createdAt: new Date(),
      updatedAt: new Date(),
      questionState: false,
      totalValue: test.totalValue,
      testResults: null,
    };
    return this.testService.create(t).then(r => {
      return t;
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(@Param() params) {
    return await this.testService.show(Number(params.id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param() params, @Body() test: any) {
    const t = {
      id: test.id,
      child: test.child,
      code: test.code,
      testResults: test.testResults,
      questionType: test.questionType,
      updatedAt: new Date(),
      questionValue: test.questionValue,
    };
    return this.testService.update(params.id, t);
  }

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
  @Post('solved/save')
  async solved(@Body() body) {
    const query = getConnection().createQueryRunner();
    await query.startTransaction();
    try {
      const test = await this.testService.show(body.test.id);
      test.totalValue = body.totalValue;
      test.questionState = 1;
      await query.manager.save(Test, test);
      await query.manager.save(TestQuestionOption, body.solution);
      // return this.questionTestSolved.create(body.solution);
      await query.commitTransaction();
      return {
        message: 'Guardado',
      };
    } catch (e) {
      console.log(e);
      await query.rollbackTransaction();
      throw new HttpException('Error', 406);
    } finally {
      await query.release();
    }
  }
}
