import {Seed} from '../seed';
import {Professional} from '../../entity/professional.entity';
import {PROFESSIONAL} from '../data/professional.data';

export class ProfessionalSeed extends Seed {
  static async run(): Promise<void> {
    try {
      const s = await this.connection;
      await s.createQueryBuilder()
        .insert()
        .into(Professional)
        .values(PROFESSIONAL)
        .execute();
      // tslint:disable-next-line:no-console
      console.log(`success ${this.name} seed \n`);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
