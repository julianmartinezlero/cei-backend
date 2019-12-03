import { InterfaceSeed, Seed } from '../seed';
import { error, log } from 'util';
import { QuestionOption } from '../../entity/questionOption.entity';
import { QUESTIONS_OPTIONS_DATA } from '../data/questionOptions.data';

export class QuestionOptionsSeed extends Seed {

  static async run(): Promise<void> {
    await this.connection.then(res => {
      res.createQueryBuilder()
        .insert()
        .into(QuestionOption)
        .values(QUESTIONS_OPTIONS_DATA)
        .execute().then(f => {
        log(`success ${this.name} seed \n`);
      }).catch(er => {
        error(er);
      });
    });
  }
}
