import {User} from '../../entity/user.entity';

export const USERS: User[] = [
  {
    id: 1,
    email: 'administrador@gmail.com',
    password: 'admin',
    username: 'Admin',
    professional: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
