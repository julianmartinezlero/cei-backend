import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { Crud } from '../interfaces/crud';

@Injectable()
export class UsersService implements Crud {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  async findOne(email: string): Promise<User | undefined> {
    return await this.userRepository.createQueryBuilder('user')
      .where('user.email = :e', { e: email })
      .getOne();
  }

  async all(): Promise<User[]> {
    return this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.children', 'children')
      .getMany();
  }

  async create(user: User): Promise<any> {
    return await this.userRepository.save(user);
  }

  async update(id: number, tutor: any) {
    return await this.userRepository.update(id, tutor);
  }

  async delete(id: number): Promise<any> {
    return await this.userRepository.delete(id);
  }

  async show(id: number): Promise<any> {
    return await this.userRepository
      .query(`SELECT professional.* FROM user JOIN professional on user.id = professional.userId WHERE user.id = ${id}`);
  }

  async login(data): Promise<any> {
    return await this.userRepository.createQueryBuilder('user')
      .where('user.email = :email', { email: data.email })
      .andWhere('user.password = :password', { password: data.password })
      .getOne();
  }
}
