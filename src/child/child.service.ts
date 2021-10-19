import { Injectable } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Child } from '../entity/child.entity';
import {
  paginate,
  Pagination,
  IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import {queue} from 'rxjs/internal/scheduler/queue';

@Injectable()
export class ChildService implements Crud {
  constructor(
    @InjectRepository(Child)
    private readonly childRepository: Repository<Child>,
  ) {
  }

  async all(options?: IPaginationOptions): Promise<Child[]> {
    // return await this.tutorRepository.createQueryBuilder().getMany();
    const query = this.childRepository.createQueryBuilder('child')
      .leftJoinAndSelect('child.professional', 'professional')
      .where('professional.deleteAt IS NULL');
      // .getMany();
    return query.getMany();
    // return paginate<Child>(query, options);
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

  findInPeriodTreatment(dateIni, dateEnd) {
    const query = this.childRepository.createQueryBuilder('child')
        .leftJoinAndSelect('child.professional', 'professional')
        .leftJoinAndSelect('child.tests', 'tests')
        .where('professional.deleteAt IS NULL')
        .andWhere('tests.createdAt >= :ini')
        .andWhere('tests.createdAt <= :end')
        .setParameters({
          ini: dateIni,
          end: dateEnd,
        });
    // .getMany();
    return query.getMany();
  }

  async inRange(min: number, max: number): Promise<Child[]> {
    // return await this.tutorRepository.createQueryBuilder().getMany();
    const query = this.childRepository.createQueryBuilder('child')
        .leftJoinAndSelect('child.professional', 'professional')
        .innerJoin('child.tests', 'test')
        .where('professional.deleteAt IS NULL')
        .andWhere('test.totalValue >= :m')
        .andWhere('test.totalValue <= :n')
        .setParameters({m: min, n: max});
    // .getMany();
    return query.getMany();
    // return paginate<Child>(query, options);
  }

  async notTest(): Promise<Child[]> {
    return this.childRepository.createQueryBuilder('child')
        .leftJoinAndSelect('child.professional', 'professional')
        .leftJoinAndSelect('child.tests', 'tests')
        .getMany();
  }
}
