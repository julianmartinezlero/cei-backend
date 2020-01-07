import { Module } from '@nestjs/common';
import { ChildController } from './child.controller';
import { ChildService } from './child.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Child } from '../entity/child.entity';
import { TutorService } from '../tutor/tutor.service';
import { Professional } from '../entity/professional.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Child, Professional])],
  controllers: [ChildController],
  providers: [ChildService, TutorService],
})
export class ChildModule {
}
