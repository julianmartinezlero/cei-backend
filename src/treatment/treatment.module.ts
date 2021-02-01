import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Treatment } from '../entity/treatment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Treatment])],
  providers: [TreatmentService],
  controllers: [TreatmentController],
  exports: [TreatmentService],
})
export class TreatmentModule {
}
