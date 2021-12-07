import { Injectable } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Professional } from '../entity/professional.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProfessionalService implements Crud {
  constructor(
    @InjectRepository(Professional)
    private readonly professionalRepository: Repository<Professional>,
  ) {
  }

  async all(): Promise<Professional[]> {
    return await this.professionalRepository.createQueryBuilder('professional')
      .where('position IS NOT NULL')
      .andWhere(`position != 'Administrador'`)
      .orderBy('professional.name,professional.lastName', 'ASC')
      .getMany();
  }

  async create(professional: Professional): Promise<any> {
    return await this.professionalRepository.insert(professional);
  }

  async update(id: number, professional: any) {
    return await this.professionalRepository.update(id, professional);
  }

  async delete(id: number): Promise<any> {
    return await this.professionalRepository.softDelete(id);
  }

  async show(id: number): Promise<any> {
    return await this.professionalRepository.findOne(id);
  }

  async search(name: string): Promise<any> {
    return await this.professionalRepository.createQueryBuilder('user')
      .where('user.name like :name', { name: '%' + name + '%' })
      .getMany();
  }

  async findProfessionalByCI(ci: string) {
    return this.professionalRepository.createQueryBuilder('p')
      .where('p.ci = :ci', {ci})
      .getOne();
  }

  async findProfessionalById(id: any) {
    return this.professionalRepository.createQueryBuilder('p')
      .where('p.id = :id', {id})
      .getOne();
  }

  async findProfessionalByUserId(id: null | number | number) {
    return this.professionalRepository.createQueryBuilder('p')
      .innerJoin('p.user', 'user')
      .where('user.id = :id', {id})
      .getOne();
  }
}
