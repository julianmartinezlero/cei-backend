import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from '../entity/child.entity';
import { TutorService } from '../tutor/tutor.service';
import { Professional } from '../entity/professional.entity';
import {UsersService} from '../users/users.service';
import {User} from '../entity/user.entity';
import {ProfessionalService} from '../professional/professional.service';
import {QuestionTestService} from '../question-test/question-test.service';
import {Question} from '../entity/question.entity';
import {QuestionOption} from '../entity/questionOption.entity';
import {QuestionAsset} from '../entity/questionAsset.entity';
import {Test} from '../entity/test.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Child, Professional, User, Professional, Test, Question, QuestionOption, QuestionAsset])],
  controllers: [ChildController],
  providers: [ChildService, TutorService, UsersService, ProfessionalService, QuestionTestService],
})
export class ChildModule {
}
