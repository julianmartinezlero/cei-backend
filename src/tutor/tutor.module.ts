import { Module } from '@nestjs/common';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tutor } from '../entity/tutor.entity';
import { ChildService } from '../child/child.service';
import { Child } from '../entity/child.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tutor, Child])],
  controllers: [TutorController],
  providers: [TutorService, ChildService],
})
export class TutorModule {}
