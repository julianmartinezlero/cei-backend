import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Treatment} from '../entity/treatment.entity';
import {TreatmentChildSession} from '../entity/treatmentChildSession.entity';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment)
    private readonly treatment: Repository<Treatment>,
    @InjectRepository(TreatmentChildSession) private readonly treatmentChildSession: Repository<TreatmentChildSession>
  ) {
  }

  async getTreatments(id) {
    return this.treatment.createQueryBuilder('treatment')
      .where('treatment.range = :range', { range: id })
      .leftJoinAndSelect('treatment.treatmentAssets', 'treatmentAssets')
      .getMany();
  }

  getTreatmentTracing(testId: number) {
    return  this.treatmentChildSession.createQueryBuilder('t')
      .leftJoinAndSelect('t.treatment', 'treatment')
      .leftJoinAndSelect('treatment.treatmentAssets', 'treatmentAssets')
      .leftJoinAndSelect('t.test', 'test')
      .where('test.id = :id', {id: testId})
      .orderBy('t.dateIni', 'ASC')
      .getMany();
  }
}
