import { createConnection } from 'typeorm';
import { OrmConfig } from '../ormconfig';

export class Seed implements InterfaceSeed {
  protected static connection = createConnection(OrmConfig);

  // tslint:disable-next-line:no-empty
  async run() {
  }
}

export interface InterfaceSeed {
  run();
}
