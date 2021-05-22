import { Injectable } from '@nestjs/common';
import { Crud } from '../interfaces/crud';
import { Test } from '../entity/test.entity';
import {getConnection, QueryRunner, Repository} from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from '../entity/question.entity';
import {QuestionAsset} from '../entity/questionAsset.entity';
import {QuestionOption} from '../entity/questionOption.entity';

@Injectable()
export class QuestionTestService implements Crud {
  constructor(@InjectRepository(Test) private testRepository: Repository<Test>,
              @InjectRepository(Question) private questionRepository: Repository<Question>,
              @InjectRepository(QuestionOption) private questionOptionRepository: Repository<QuestionOption>,
              @InjectRepository(QuestionAsset) private assetRepository: Repository<QuestionAsset>) {
  }

  async all(): Promise<Test[]> {
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

  async show(id: any, query?: QueryRunner) {
    let q = this.testRepository.createQueryBuilder('test');
    if (query) {
      q = query.manager.getRepository(Test).createQueryBuilder('test');
    }

    q.leftJoinAndSelect('test.child', 'child')
    .leftJoinAndSelect('test.professional', 'professional')
    .leftJoinAndSelect('test.treatmentChildren', 'treatmentChildren')
    .leftJoinAndSelect('treatmentChildren.treatment', 'treatment')
    .leftJoinAndSelect('treatment.treatmentAssets', 'treatmentAssets')
    .where('test.id = :a', {a: id});
      // .andWhere('professional.deleteAt IS NULL')
    return q.getOne();
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
      .orderBy('question.id', 'ASC')
      .getMany();
  }

  async testChild(childId: any) {
    return this.testRepository.createQueryBuilder('test')
      .leftJoinAndSelect('test.treatmentChildren', 'treatmentChildren')
      .leftJoinAndSelect('treatmentChildren.treatment', 'treatment')
      .leftJoinAndSelect('treatment.treatmentAssets', 'treatmentAssets')
      .leftJoinAndSelect('test.child', 'child')
      .where('child.id = :id', {id: childId})
      .orderBy('test.createdAt', 'DESC')
      .getMany();
  }

  createAssets(asset: QuestionAsset) {
    return this.assetRepository.save(asset);
  }

  deleteAsset(id: any) {
    return this.assetRepository.delete(id);
  }

  async updateQuestion(question: Question, options: any[], query: QueryRunner) {
    const qu = await this.questionRepository.createQueryBuilder().where('id = :i', {i: question.id}).getOne();
    qu.question = question.question;
    qu.details = question.details;
    for (const option of options) {
      const q = await this.questionOptionRepository.createQueryBuilder().where('id = :i', {i: option.id}).getOne();
      q.description = option.description;
      await query.manager.save(QuestionOption, q);
    }
    await query.manager.save(Question, qu);
  }

}
