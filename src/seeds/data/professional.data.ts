import {Professional} from '../../entity/professional.entity';

export const PROFESSIONAL: Professional[] = [
  {
    id: 1,
    user: {
      id: 1,
      email: 'administrador@gmail.com',
      password: 'admin',
      username: 'Admin',
      professional: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    cell: '7777777',
    ci: '00000000',
    isProfessional: false,
    name: 'Administrador',
    lastName: 'administrador',
    position: 'Administrador',
    profession: 'administrador',
    children: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    tests: [],
  },
];
