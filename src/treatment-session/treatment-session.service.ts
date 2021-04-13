import { Injectable } from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {TreatmentChildSession} from '../entity/treatmentChildSession.entity';
import {Repository} from 'typeorm';

@Injectable()
export class TreatmentSessionService {
  constructor(@InjectRepository(TreatmentChildSession) private readonly sessionRepository: Repository<TreatmentChildSession>) {
  }
  getOneSession(id: any) {
    return this.sessionRepository.createQueryBuilder('t')
      .where('t.id = :id', {id})
      .getOne();
  }

  updateOneSession(id: number, b: boolean) {
    return this.sessionRepository.save({id, state: b});
  }
}
