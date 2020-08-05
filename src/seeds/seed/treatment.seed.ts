import { Seed } from '../seed';
import { error, log } from 'util';
import { Treatment } from '../../entity/treatment.entity';
import { TREATMENT_DATA } from '../data/treatment.data';

export class TreatmentSeed extends Seed {

  static async run(): Promise<void> {
    await this.connection.then(res => {
      res.createQueryBuilder()
        .insert()
        .into(Treatment)
        .values(TREATMENT_DATA)
        .execute().then(f => {
        log(`success ${this.name} seed \n`);
      }).catch(er => {
        error(er);
      });
    });
  }
}
