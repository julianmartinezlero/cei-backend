import { Injectable } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from '../entity/question.entity';
import { TestQuestionOption } from '../entity/testQuestionOption.entity';

@Injectable()
export class QuestionTestSolvedService implements Crud {
  constructor(@InjectRepository(TestQuestionOption) private readonly testQuestionOption: Repository<TestQuestionOption>) {
  }

  all() {
  }

  async create(value: any): Promise<any> {
    return await this.testQuestionOption.insert(value);
  }

  // tslint:disable-next-line:no-empty
  delete(id: any) {
  }

  // tslint:disable-next-line:no-empty
  show(id: any) {
  }

  update(id: any, value: any) {
    return this.testQuestionOption.update(id, value);
  }

}
