import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Test } from './test.entity';

@Entity()
export class Professional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  lastName: string;

  @Column({ length: 10, unique: true })
  ci: string;

  @Column({ length: 10, unique: true })
  cell: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'varchar', length: 200 })
  position: string;

  @Column({ type: 'varchar', length: 200 })
  profession: string;

  @OneToMany(type => Test, test => test.professional)
  tests: Test[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
