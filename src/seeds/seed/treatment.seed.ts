import {Seed} from '../seed';
import {Treatment} from '../../entity/treatment.entity';
import {TREATMENT_DATA} from '../data/treatment.data';

export class TreatmentSeed extends Seed {

  static async run(): Promise<void> {
    try {
      const s = await this.connection;
      await s.createQueryBuilder()
        .insert()
        .into(Treatment)
        .values(TREATMENT_DATA)
        .execute();
      // tslint:disable-next-line:no-console
      console.log(`success ${this.name} seed \n`);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
