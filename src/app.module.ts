import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { TutorModule } from './tutor/tutor.module';
import { ChildModule } from './child/child.module';
import { ProfessionalModule } from './professional/professional.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_cei',
      entities: [join(__dirname, '**/**.entity{.ts,.js}')],
      synchronize: true,
    }),
    TutorModule,
    ChildModule,
    ProfessionalModule,
  ],
  providers: [],
})
export class AppModule {}
