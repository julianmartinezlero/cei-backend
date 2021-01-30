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

@Module({
  imports: [TypeOrmModule.forFeature([Child, Professional, User, Professional])],
  controllers: [ChildController],
  providers: [ChildService, TutorService, UsersService, ProfessionalService],
})
export class ChildModule {
}
