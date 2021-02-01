import { Injectable } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Child } from '../entity/child.entity';

@Injectable()
export class ChildService implements Crud {
  constructor(
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
  ) {
  }

  async all(): Promise<Child[]> {
    // return await this.tutorRepository.createQueryBuilder().getMany();
    return this.childRepository.createQueryBuilder('child')
      .leftJoinAndSelect('child.professional', 'professional')
      .where('professional.deleteAt IS NULL')
      .getMany();
  }

  async create(child: Child | Child[]): Promise<any> {
    return await this.childRepository.insert(child);
  }

  async update(id: number, child: any) {
    return await this.childRepository.update(id, child);
  }

  async delete(id: number): Promise<any> {
    return await this.childRepository.delete(id);
  }

  async show(id: number) {
    return this.childRepository.findOne(id);
  }

  async search(name: string): Promise<any> {
    return await this.childRepository.createQueryBuilder('user')
      .where('user.name like :name', { name: '%' + name + '%' })
      .getMany();
  }

  async ofTutor(idTutor: number): Promise<any> {
    console.log(idTutor);
    return await this.childRepository.createQueryBuilder('child')
      .leftJoinAndSelect('child.tests', 'tests')
      .where('child.professional.id = :idT', { idT: idTutor })
      .getMany();
  }

  async findChildByCI(ci: string) {
    return await this.childRepository.createQueryBuilder('p')
      .where('p.ci = :ci', {ci})
      .getOne();
  }
}
