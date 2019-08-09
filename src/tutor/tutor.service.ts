import { Injectable } from '@nestjs/common';
import { Tutor } from '../entity/tutor.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crud } from '../interfaces/crud';

@Injectable()
export class TutorService implements Crud {
  constructor(
    @InjectRepository(Tutor)
    private readonly tutorRepository: Repository<Tutor>,
  ) {}
  async all(): Promise<Tutor[]> {
    return await this.tutorRepository.createQueryBuilder().getMany();
  }
  async create(tutor: Tutor): Promise<any> {
    return await this.tutorRepository.insert(tutor);
  }

  async update(id: number, tutor: any) {
    return await this.tutorRepository.update(id, tutor);
  }

  async delete(id: number): Promise<any> {
    return await this.tutorRepository.delete(id);
  }

  async show(id: number): Promise<any> {
    return await this.tutorRepository.findOne(id);
  }

  async search(name: string): Promise<any> {
    return await this.tutorRepository.createQueryBuilder('user')
      .where('user.name like :name', {name: '%' + name + '%' })
      .getMany();
  }
}
