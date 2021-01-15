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
    return await this.professionalRepository.createQueryBuilder()
      .where('position IS NOT NULL')
      .getMany();
  }

  async create(professional: Professional): Promise<any> {
    return await this.professionalRepository.insert(professional);
  }

  async update(id: number, professional: any) {
    return await this.professionalRepository.update(id, professional);
  }

  async delete(id: number): Promise<any> {
    return await this.professionalRepository.delete(id);
  }

  async show(id: number): Promise<any> {
    return await this.professionalRepository.findOne(id);
  }

  async search(name: string): Promise<any> {
    return await this.professionalRepository.createQueryBuilder('user')
      .where('user.name like :name', { name: '%' + name + '%' })
      .getMany();
  }
}
