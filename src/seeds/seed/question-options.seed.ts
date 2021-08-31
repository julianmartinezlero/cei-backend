import {Seed} from '../seed';
import {error, log} from 'util';
import {QuestionOption} from '../../entity/questionOption.entity';
import {QUESTIONS_OPTIONS_DATA} from '../data/questionOptions.data';

export class QuestionOptionsSeed extends Seed {

  static async run(): Promise<void> {
    try {
      const s = await this.connection;
      await s.createQueryBuilder()
        .insert()
        .into(QuestionOption)
        .values(QUESTIONS_OPTIONS_DATA)
        .execute();
      // tslint:disable-next-line:no-console
      console.log(`success ${this.name} seed \n`);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
