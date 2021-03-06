import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Child } from './child.entity';
import { TestQuestionOption } from './testQuestionOption.entity';
import { Professional } from './professional.entity';
import {TreatmentChild} from './treatmentChild.entity';
import {TreatmentChildSession} from './treatmentChildSession.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 10 })
  code: string;

  @Column({ type: 'boolean', default: false })
  questionState: boolean| number;

  @Column({ type: 'double', default: null, nullable: true })
  totalValue: number;

  @OneToMany(type => TestQuestionOption, test => test.test, {nullable: true})
  @JoinColumn()
  testResults: TestQuestionOption[];

  @ManyToOne(type => Child, child => child.tests)
  @JoinColumn()
  child: Child;

  @ManyToOne(type => Professional, professional => professional.tests, { nullable: false })
  @JoinColumn()
  professional: Professional;

  @OneToMany(type => TreatmentChild, treatmentChild => treatmentChild.test)
  @JoinColumn()
  treatmentChildren: TreatmentChild[];

  @OneToMany(type => TreatmentChildSession, treatmentChildSession => treatmentChildSession.test)
  @JoinColumn()
  treatmentChildSessions: TreatmentChildSession[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
