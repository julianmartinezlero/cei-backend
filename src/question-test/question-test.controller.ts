import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { QuestionTestService } from './question-test.service';
import { Crud } from '../interfaces/crud';
import { Test } from '../entity/test.entity';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
import { ChildService } from '../child/child.service';
import { Child } from '../entity/child.entity';
import { QuestionTestSolvedService } from './question-test-solved.service';

@Controller('question-test')
export class QuestionTestController implements Crud {
  constructor(private readonly testService: QuestionTestService,
              private readonly questionTestSolved: QuestionTestSolvedService,
              private readonly userService: UsersService,
              private readonly childService: ChildService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  all(): Promise<Test[]> {
    return this.testService.all();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() test: any, @Request() req) {
    return this.userService.show(req.user.id).then(res => {
      return this.childService.show(test.childId).then((chi: Child) => {
        const t: Test = {
          id: null,
          code: test.code,
          professional: res[0],
          child: chi,
          createdAt: new Date(),
          updatedAt: new Date(),
          questionState: test.questionState,
          testResults: null,
        };
        return this.testService.create(t).then(r => {
          return t;
        });
      });
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  show(@Param() params) {
    return this.testService.show(params.id);
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
  solved(@Body() body) {
    return this.questionTestSolved.create(body.solution);
  }
}
