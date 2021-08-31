import {Seed} from '../seed';
import {error, log} from 'util';
import {QUESTIONS_ASSETS_DATA} from '../data/questionAssets.data';
import {QuestionAsset} from '../../entity/questionAsset.entity';

export class QuestionAssetSeed extends Seed {

  static async run(): Promise<void> {
    try {
      const s = await this.connection;
      await s.createQueryBuilder()
        .insert()
        .into(QuestionAsset)
        .values(QUESTIONS_ASSETS_DATA)
        .execute();
      // tslint:disable-next-line:no-console
      console.log(`success ${this.name} seed \n`);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
