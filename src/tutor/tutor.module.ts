import { Module } from '@nestjs/common';
import { TutorController } from './tutor.controller';
import { TutorService } from './tutor.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChildService } from '../child/child.service';
import { Child } from '../entity/child.entity';
import { Professional } from '../entity/professional.entity';
import { UsersService } from '../users/users.service';
import { User } from '../entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Professional, Child, User])],
  controllers: [TutorController],
  providers: [TutorService, ChildService, UsersService],
})
export class TutorModule {}
