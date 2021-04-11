import {Controller, Get, Param, Post} from '@nestjs/common';
import { TreatmentService } from './treatment.service';

@Controller('treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {
  }

  @Get(':range')
  show(@Param() params) {
    return this.treatmentService.getTreatments(params.range);
  }

  @Post(':range')
  createTreatment(@Param() params) {
    return this.treatmentService.getTreatments(params.ramge);
  }

  @Get(':testId/tracing')
  async showTreatmentTracing(@Param() params) {
    return  this.treatmentService.getTreatmentTracing(params.testId);
  }
}
