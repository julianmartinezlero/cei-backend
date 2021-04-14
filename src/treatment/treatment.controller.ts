import {Controller, Get, Param, Post, Query, Res} from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import * as fs from 'fs';
import * as path from 'path';

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

  @Get('resources/treatment')
  async getResources(@Query() query) {
    const dirname =  path.normalize(__dirname + '/../../' + '/INTERVENCION');

    const files = query;
    const result = [];
    // tslint:disable-next-line:forin
    for (const index in query) {
      result.push( {
        path: files[index],
        tree: fs.readdirSync(path.normalize(dirname + '/' + files[index])).map(a => {
          return {
            path: a,
          };
        }),
      });
    }
    return result;
  }

  @Get('resources/treatment/:file')
  async getRenderTransactionFile(@Param() params, @Res() res, @Query() query) {
    const dirname =  path.normalize(__dirname + '/../../' + '/INTERVENCION/' + query.path);
    return res.sendFile(params.file, { root: dirname });
  }
}
