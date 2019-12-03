import { Module } from '@nestjs/common';
import { QuestionTestController } from './question-test.controller';
import { QuestionTestService } from './question-test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '../entity/test.entity';
import { Question } from '../entity/question.entity';
import { QuestionOption } from '../entity/questionOption.entity';
import { QuestionAsset } from '../entity/questionAsset.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, Question, QuestionOption, QuestionAsset])],
  controllers: [QuestionTestController],
  providers: [QuestionTestService],
})
export class QuestionTestModule {
}
