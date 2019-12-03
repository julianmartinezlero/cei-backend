import { join } from 'path';
import { ConnectionOptions } from 'typeorm';

export const OrmConfig: ConnectionOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'db_cei',
  entities: [join(__dirname, '**/**.entity{.ts,.js}')],
  synchronize: true,
};
