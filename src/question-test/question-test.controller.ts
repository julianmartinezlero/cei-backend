import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Query,
  Req,
  Request,
  Res,
  UploadedFiles,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import {QuestionTestService} from './question-test.service';
import {Test} from '../entity/test.entity';
import {AuthGuard} from '@nestjs/passport';
import {UsersService} from '../users/users.service';
import {ChildService} from '../child/child.service';
import {QuestionTestSolvedService} from './question-test-solved.service';
import {editFileName, randomId} from '../utils/utils';
import {getConnection, QueryRunner} from 'typeorm';
import {TestQuestionOption} from '../entity/testQuestionOption.entity';
import {ProfessionalService} from '../professional/professional.service';
import {TreatmentService} from '../treatment/treatment.service';
import {TreatmentChild} from '../entity/treatmentChild.entity';
import {TreatmentChildSession} from '../entity/treatmentChildSession.entity';
import * as moment from 'moment';
// import {editFileName} from '';
import {diskStorage} from 'multer';
import * as path from 'path';
import {FileFieldsInterceptor} from '@nestjs/platform-express';
import {QuestionAsset} from '../entity/questionAsset.entity';
import {Question} from '../entity/question.entity';

@Controller('question-test')
export class QuestionTestController {
  constructor(private readonly testService: QuestionTestService,
              private readonly questionTestSolved: QuestionTestSolvedService,
              private readonly userService: UsersService,
              private readonly professionalService: ProfessionalService,
              private readonly treatmentService: TreatmentService,
              private readonly childService: ChildService) {
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async all(): Promise<Test[]> {
    return await this.testService.all();
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  async show(@Param() params) {
    return await this.testService.show(Number(params.id));
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  delete(@Param() params) {
    return this.testService.delete(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id/solved')
  forSolved(@Param() params, @Request() req) {
    return this.testService.getQuestions();
  }

  @Get('resources/assets/:file')
  async getRenderTransactionFile(@Param() params, @Res() res) {
    const dirname =  path.normalize(__dirname  + '/../../assets/');
    return res.sendFile(params.file, { root: dirname });
  }

  @Post('uploadAsset/:id')
  @UseInterceptors(FileFieldsInterceptor([
    { name: 'file', maxCount: 1 },
  ], {
    storage: diskStorage({
      destination: 'assets',
      filename: editFileName,
    }),
  }))
  async saveFile(@Body() body, @Param() params,  @Request() req, @UploadedFiles() files) {
    const asset = new QuestionAsset();
    asset.asset = files.file[0].filename;
    asset.assetType = asset.asset.split('.')[asset.asset.split('.').length - 1];
    asset.question = {id: params.id} as Question;
    return this.testService.createAssets(asset).then(a => {
        return {
          message: 'Subido',
          data: asset,
        };
    });
  }

  @Delete('deleteAsset/:id')
  async deleteAsset(@Param() params) {
    return this.testService.deleteAsset(params.id).then(a => {
      return {
        message: 'Eliminado',
        code: 200,
      };
    });
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('testChild/:childId')
  async testChild(@Param() params, @Request() req) {
    return await this.testService.testChild(params.childId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('solved/save')
  async solved(@Body() body, @Req() req) {
    let testResult: Test;
    const professional = await this.professionalService.findProfessionalByUserId(req.user.id);
    const query = getConnection().createQueryRunner();
    await query.startTransaction();
    try {
      const test = new Test();
      test.code = randomId();
      test.professional =  professional;
      test.child = body.child;
      test.questionState = true;
      test.totalValue = body.totalValue.toFixed(2);
      await query.manager.save(Test, test);
      const solutions = [];
      for (const s of body.solution) {
        s.test = test;
        solutions.push(s);
      }
      await query.manager.save(TestQuestionOption, solutions);
      await this.createTreatment(test, query);
      testResult = await this.testService.show(test.id, query);
      const treatmentsChildren = testResult.treatmentChildren.filter(a => a.treatment.treatmentAssets.length > 0);
      const treatmentsSession = testResult.treatmentChildren.find(a => a.treatment.treatmentAssets.length === 0);
      const now = moment();
      const colors = ['blue-event', 'purple-event', 'cyan-event', 'green-event', 'orange-event'];
      const weeks = now.get('weeks');
      for (let i = 0; i < treatmentsSession.treatment.week; i++) {
        for (let index = 0; index < treatmentsChildren.length; index ++) {
          while (now.day() === 0 || now.day() === 6) {
            now.add(1, 'day');
          }
          const r = new TreatmentChildSession();
          r.treatment = treatmentsChildren[index].treatment;
          r.test = test;
          r.classColor = colors[index];
          r.dateIni = now.format('YYYY-MM-DD');
          r.dateEnd = now.format('YYYY-MM-DD');
          await query.manager.save(TreatmentChildSession, r);
          now.add(1, 'day');
        }
      }
      await query.commitTransaction();
      return {
        message: 'Guardado',
        testResult,
      };
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
      await query.rollbackTransaction();
      throw new HttpException('Error', 406);
    } finally {
      await query.release();
    }
  }

  async createTreatment(test: Test, query: QueryRunner) {
    const treatments = await this.treatmentService.getTreatments(await this.getRange(test.totalValue));
    for (const treatment of treatments) {
      const t = new TreatmentChild();
      t.treatment = treatment;
      t.test = test;
      await query.manager.save(TreatmentChild, t);
    }
  }

  async getRange(total) {
    if (total >= 0 && total <= 0.69) {
      return 0;
    }
    if (total >= 0.70 && total <= 1.19) {
      return 1;
    }
    if (total >= 1.20 && total <= 1.70) {
      return 2;
    }
    if (total >= 1.71 && total <= 3) {
      return 3;
    }
  }
}
