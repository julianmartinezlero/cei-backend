import {Controller, Get, Param, Put} from '@nestjs/common';
import {TreatmentSessionService} from './treatment-session.service';

@Controller('treatment-session')
export class TreatmentSessionController {
  constructor(private treatmentSessionService: TreatmentSessionService) {
  }
  @Get(':id/update')
  updateSessionState(@Param() params) {
    return this.treatmentSessionService.getOneSession(params.id).then(session => {
      return this.treatmentSessionService.updateOneSession(session.id, !session.state);
    });
  }
}
