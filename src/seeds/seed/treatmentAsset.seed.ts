import {Seed} from '../seed';
import {error, log} from 'util';
import {TREATMENT_ASSETS_DATA} from '../data/treatmentAssets.data';
import {TreatmentAsset} from '../../entity/treatmentAsset.entity';

export class TreatmentAssetSeed extends Seed {

  static async run(): Promise<void> {
    try {
      const s = await this.connection;
      await s.createQueryBuilder()
        .insert()
        .into(TreatmentAsset)
        .values(TREATMENT_ASSETS_DATA)
        .execute();
      // tslint:disable-next-line:no-console
      console.log(`success ${this.name} seed \n`);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
