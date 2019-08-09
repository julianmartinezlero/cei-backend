import { Module } from '@nestjs/common';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from '../entity/tutor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor])],
  controllers: [TutorController],
  providers: [TutorService],
})
export class TutorModule {}
