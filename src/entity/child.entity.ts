import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tutor } from './tutor.entity';
import { Test } from './test.entity';

@Entity()
export class Child {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  lastName: string;

  @Column({ type: 'date' })
  birthDate: string;

  @Column({ type: 'varchar', length: 9 })
  sex: string;

  @Column({ length: 10, nullable: true })
  ci: string;

  @Column({ nullable: true, type: 'longtext' })
  photo: any;

  @ManyToOne(type => Tutor, tutor => tutor.children, { nullable: false, onDelete: 'CASCADE' })
  tutor: Tutor;

  @Column()
  tutorId: number;

  @OneToMany(type => Test, test => test.child)
  tests: Test[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
