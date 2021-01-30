import { Injectable } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { Test } from '../entity/test.entity';
import {getConnection, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entity/question.entity';

@Injectable()
export class QuestionTestService implements Crud {
  constructor(@InjectRepository(Test) private testRepository: Repository<Test>,
              @InjectRepository(Question) private questionRepository: Repository<Question>) {
  }

  async all(): Promise<Test[]> {
    // return await this.testRepository.query(
    //   'SELECT\n' +
    //   'test.id,\n' +
    //   'test.code,\n' +
    //   'test.questionState,\n' +
    //   'CONCAT(child.name, CONCAT(\' \',child.lastName)) AS name,\n' +
    //   'CONCAT(professional.name, CONCAT(\' \',professional.lastName)) AS professional,\n' +
    //   'test.childId,\n' +
    //   'test.professionalId,\n' +
    //   'test.createdAt,\n' +
    //   'test.updatedAt\n' +
    //   'FROM test JOIN child ON test.childId=child.id\n' +
    //   'LEFT JOIN professional ON professional.id = test.professionalId');
    return this.testRepository.createQueryBuilder('t')
      .innerJoinAndSelect('t.professional', 'professional')
      .innerJoinAndSelect('t.child', 'child')
      .innerJoin('child.professional', 'tutor')
      .where('tutor.deleteAt IS NULL')
      .getMany();
  }

  async create(test: Test): Promise<any> {
    return await this.testRepository.insert(test);
  }

  async show(id: any) {
    return this.testRepository.createQueryBuilder('test')
      .innerJoinAndSelect('test.child', 'child')
      .innerJoinAndSelect('test.professional', 'professional')
      .where('test.id = :a', {a: id})
      .andWhere('professional.deleteAt IS NULL')
      .getOne();
  }

  async update(id: any, test): Promise<any> {
    return await this.testRepository.update(id, test);
  }

  async delete(id: any): Promise<any> {
    return await this.testRepository.delete(id);
  }

  async getQuestions(): Promise<any> {
    return await this.questionRepository.createQueryBuilder('question')
      .leftJoinAndSelect('question.questionOptions', 'options')
      .leftJoinAndSelect('question.questionAssets', 'assets')
      .getMany();
  }
}
