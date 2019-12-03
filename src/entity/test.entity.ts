import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Child } from './child.entity';
import { TestQuestionOption } from './testQuestionOption.entity';
import { Professional } from './professional.entity';
import { Tutor } from './tutor.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  code: string;

  @Column({ type: 'boolean', default: false })
  questionState: number;

  @OneToMany(type => TestQuestionOption, test => test.test)
  @JoinColumn()
  testResults: TestQuestionOption[];

  @ManyToOne(type => Child, child => child.tests)
  child?: Child;

  @ManyToOne(type => Professional, professional => professional.tests, { nullable: true })
  professional?: Professional;

  @ManyToOne(type => Tutor, tutor => tutor.tests, { nullable: true })
  tutor?: Tutor;

  @Column()
  childId: number;

  @Column()
  professionalId: number;

  @Column()
  tutorId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
