import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TutorModule } from './tutor/tutor.module';
import { ChildModule } from './child/child.module';
import { ProfessionalModule } from './professional/professional.module';
import { QuestionTestModule } from './question-test/question-test.module';
import { OrmConfig } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TreatmentModule } from './treatment/treatment.module';
import { TreatmentSessionModule } from './treatment-session/treatment-session.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig),
    AuthModule,
    TutorModule,
    ChildModule,
    ProfessionalModule,
    QuestionTestModule,
    UsersModule,
    TreatmentModule,
    TreatmentSessionModule,
  ],
})
export class AppModule {}
