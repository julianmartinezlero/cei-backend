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
      .where('tutor.position IS NULL')
      // .andWhere('')
      .getMany();
  }

  async create(tutor: Professional): Promise<any> {
    return await this.tutorRepository.insert(tutor);
  }

  async update(id: number, tutor: any) {
    return await this.tutorRepository.update(id, tutor);
  }

  async delete(id: number): Promise<any> {
    return await this.tutorRepository.softDelete(id);
  }

  async show(id: number) {
    return await this.tutorRepository.createQueryBuilder('d')
      .where('d.id = :id', { id})
      .getOne();
  }

  async search(name: string): Promise<any> {
    return await this.tutorRepository.createQueryBuilder('user')
      .where('user.name like :name', {name: '%' + name + '%' })
      .getMany();
  }

  async searchByUserId(id: number) {
    return this.tutorRepository.createQueryBuilder('tutor')
      .where('tutor.user.id = :idUser', { idUser: id })
      .getOne();
  }

  async findTutorByCI(ci: string) {
    return await this.tutorRepository.createQueryBuilder('p')
      .where('p.ci = :ci', {ci})
      .getOne();
  }

  async findTutorById(id: any) {
    return this.tutorRepository.createQueryBuilder('p')
      .where('p.id = :id', {id})
      .getOne();
  }
}
