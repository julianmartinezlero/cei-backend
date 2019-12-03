import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { QuestionTestService } from './question-test.service';
import { Crud } from '../interfaces/crud';
import { Test } from '../entity/test.entity';

@Controller('question-test')
export class QuestionTestController implements Crud {
  constructor(private readonly testService: QuestionTestService) {
  }

  @Get()
  all(): Promise<Test[]> {
    return this.testService.all();
  }

  @Post()
  create(@Body() test: Test) {
    const t: any = {
      id: null,
      code: test.code,
      childId: test.childId,
      professionalId: test.professionalId,
      tutorId: test.tutorId,
      createdAt: new Date(),
      updatedAt: new Date(),
      questionState: test.questionState,
    };
    return this.testService.create(t);
  }

  @Get(':id')
  show(@Param() params) {
    return this.testService.show(params.id);
  }

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

  @Delete(':id')
  delete(@Param() params) {
    return this.testService.delete(params.id);
  }

  @Get(':id/solved')
  solved(@Param() params) {
    return this.testService.getQuestions();
  }

}
