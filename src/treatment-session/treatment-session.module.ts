import { Module } from '@nestjs/common';
import { TreatmentSessionController } from './treatment-session.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {TreatmentChildSession} from '../entity/treatmentChildSession.entity';
import { TreatmentSessionService } from './treatment-session.service';

@Module({
  imports: [TypeOrmModule.forFeature([TreatmentChildSession])],
  controllers: [TreatmentSessionController],
  providers: [
  TreatmentSessionService,
  ],
})
export class TreatmentSessionModule {}
