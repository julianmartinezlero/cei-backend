import { Module } from '@nestjs/common';
import { ProfessionalController } from './professional.controller';
import { ProfessionalService } from './professional.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Professional } from '../entity/professional.entity';
import { User } from '../entity/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [TypeOrmModule.forFeature([Professional, User])],
  controllers: [ProfessionalController],
  providers: [ProfessionalService, UsersService],
})
export class ProfessionalModule {
}
