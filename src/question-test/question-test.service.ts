import { Injectable } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { Test } from '../entity/test.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entity/question.entity';

@Injectable()
export class QuestionTestService implements Crud {
  constructor(@InjectRepository(Test) private readonly testRepository: Repository<Test>,
              @InjectRepository(Question) private readonly questionRepository: Repository<Question>) {
  }

  async all(): Promise<Test[]> {
    return await this.testRepository.query(
      'SELECT\n' +
      'test.id,\n' +
      'test.code,\n' +
      'test.questionState,\n' +
      'CONCAT(child.name, CONCAT(\' \',child.lastName)) AS name,\n' +
      'CONCAT(tutor.name, CONCAT(\' \',tutor.lastName)) AS tutor,\n' +
      'CONCAT(professional.name, CONCAT(\' \',professional.lastName)) AS professional,\n' +
      'test.childId,\n' +
      'test.tutorId,\n' +
      'test.createdAt,\n' +
      'test.updatedAt\n' +
      'FROM test JOIN child ON test.childId=child.id\n' +
      'LEFT JOIN tutor ON tutor.id = test.tutorId\n' +
      'LEFT JOIN professional ON professional.id = test.professionalId');
  }

  async create(test: Test): Promise<any> {
    return await this.testRepository.insert(test);
  }

  async show(id: any): Promise<any> {
    return await this.testRepository.findOne(id);
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
