import {Question} from '../../entity/question.entity';
import {error, log} from 'util';
import {QUESTIONS_DATA} from '../data/question.data';
import {Seed} from '../seed';

export class QuestionSeed extends Seed {

  static async run(): Promise<void> {
    try {
      const s = await this.connection;
      await s.createQueryBuilder()
        .insert()
        .into(Question)
        .values(QUESTIONS_DATA)
        .execute();
      log(`success ${this.name} seed \n`);
    } catch (e) {
      error(e);
    }
  }
}
