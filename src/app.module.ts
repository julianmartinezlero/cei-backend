import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorModule } from './tutor/tutor.module';
import { ChildModule } from './child/child.module';
import { ProfessionalModule } from './professional/professional.module';
import { QuestionTestModule } from './question-test/question-test.module';
import { OrmConfig } from './ormconfig';
@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    TutorModule,
    ChildModule,
    ProfessionalModule,
    QuestionTestModule,
  ],
  providers: [],
})
export class AppModule {}
