import { Injectable } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Child } from '../entity/child.entity';

@Injectable()
export class ChildService implements Crud {
  constructor(
    @InjectRepository(Child)
    private readonly tutorRepository: Repository<Child>,
  ) {
  }

  async all(): Promise<Child[]> {
    return await this.tutorRepository.createQueryBuilder().getMany();
  }

  async create(child: Child | Child[]): Promise<any> {
    return await this.tutorRepository.insert(child);
  }

  async update(id: number, child: any) {
    return await this.tutorRepository.update(id, child);
  }

  async delete(id: number): Promise<any> {
    return await this.tutorRepository.delete(id);
  }

  async show(id: number): Promise<any> {
    return await this.tutorRepository.findOne(id);
  }

  async search(name: string): Promise<any> {
    return await this.tutorRepository.createQueryBuilder('user')
      .where('user.name like :name', { name: '%' + name + '%' })
      .getMany();
  }
}
