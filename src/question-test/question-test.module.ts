import { Module } from '@nestjs/common';
import { QuestionTestController } from './question-test.controller';
import { QuestionTestService } from './question-test.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from '../entity/test.entity';
import { Question } from '../entity/question.entity';
import { QuestionOption } from '../entity/questionOption.entity';
import { QuestionAsset } from '../entity/questionAsset.entity';
import { UsersService } from '../users/users.service';
import { User } from '../entity/user.entity';
import { Child } from '../entity/child.entity';
import { ChildService } from '../child/child.service';
import { QuestionTestSolvedService } from './question-test-solved.service';
import { TestQuestionOption } from '../entity/testQuestionOption.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, TestQuestionOption, Question, QuestionOption, QuestionAsset, User, Child])],
  controllers: [QuestionTestController],
  providers: [QuestionTestService, QuestionTestSolvedService, UsersService, ChildService],
})
export class QuestionTestModule {
}
