import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Child } from './child.entity';
import { Test } from './test.entity';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 200})
  name: string;

  @Column({type: 'varchar', length: 200})
  lastName: string;

  @Column({length: 10, unique: true})
  ci: string;

  @Column({length: 10, unique: true})
  cell: string;

  @Column({length: 100, unique: true})
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;

  @OneToMany(type => Child, child => child.tutor, { cascade: true, eager: true })
  @JoinColumn()
  children: Child[];

  @OneToMany(type => Test, test => test.tutor)
  tests: Test[];
}
