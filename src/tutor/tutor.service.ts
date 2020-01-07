import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Crud } from '../interfaces/crud';
import { Professional } from '../entity/professional.entity';

@Injectable()
export class TutorService implements Crud {
  constructor(
    @InjectRepository(Professional)
    private readonly tutorRepository: Repository<Professional>,
  ) {}

  async all(): Promise<Professional[]> {
    return this.tutorRepository.createQueryBuilder('tutor')
      .leftJoinAndSelect('tutor.children', 'children')
      .getMany();
  }

  async create(tutor: Professional): Promise<any> {
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

  async searchByUserId(id: number): Promise<any> {
    return await this.tutorRepository.createQueryBuilder('tutor')
      .where('tutor.userId = :idUser', { idUser: id })
      .getOne();
  }
}
