import { Question } from '../../entity/question.entity';
import { error, log } from 'util';
import { QUESTIONS_DATA } from '../data/question.data';
import { Seed } from '../seed';

export class QuestionSeed extends Seed {

  static async run(): Promise<void> {
    await this.connection.then(res => {
      res.createQueryBuilder()
        .insert()
        .into(Question)
        .values(QUESTIONS_DATA)
        .execute().then(f => {
        log(`success ${this.name} seed \n`);
      }).catch(er => {
        error(er);
      });
    });
  }
}
