import {Seed} from '../seed';
import {error, log} from 'util';
import {USERS} from '../data/users.data';
import {User} from '../../entity/user.entity';

export class UserSeed extends Seed {

  static async run(): Promise<void> {
    try {
      const s = await this.connection;
      await s.createQueryBuilder()
        .insert()
        .into(User)
        .values(USERS)
        .execute();
      // tslint:disable-next-line:no-console
      console.log(`success ${this.name} seed \n`);
    } catch (e) {
      // tslint:disable-next-line:no-console
      console.log(e);
    }
  }
}
