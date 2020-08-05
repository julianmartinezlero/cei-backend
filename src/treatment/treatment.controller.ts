import { Controller, Get, Param } from '@nestjs/common';
import { TreatmentService } from './treatment.service';

@Controller('treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) {
  }

  @Get(':range')
  show(@Param() params) {
    return this.treatmentService.getTreatments(params.range);
  }
}
