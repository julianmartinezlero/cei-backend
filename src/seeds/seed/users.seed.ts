import {Seed} from '../seed';
import {error, log} from 'util';
import {USERS} from '../data/users.data';
import {User} from '../../entity/user.entity';

export class UserSeed extends Seed {

  static async run(): Promise<void> {
    await this.connection.then(res => {
      res.createQueryBuilder()
        .insert()
        .into(User)
        .values(USERS)
        .execute().then(f => {
        log(`success ${this.name} seed \n`);
      }).catch(er => {
        error(er);
      });
    });
  }
}
