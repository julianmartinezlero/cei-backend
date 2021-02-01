import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from '../entity/professional.entity';
import { Repository } from 'typeorm';
import { Treatment } from '../entity/treatment.entity';

@Injectable()
export class TreatmentService {
  constructor(
    @InjectRepository(Treatment)
    private readonly treatment: Repository<Treatment>,
  ) {
  }

  async getTreatments(id) {
    return this.treatment.createQueryBuilder('treatment')
      .where('treatment.range = :range', { range: id })
      .getMany();
  }
}
