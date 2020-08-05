import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Child } from './child.entity';
import { TestQuestionOption } from './testQuestionOption.entity';
import { Professional } from './professional.entity';

@Entity()
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  code: string;

  @Column({ type: 'boolean', default: false })
  questionState: number;

  @Column({ type: 'double', default: null, nullable: true })
  totalValue: number;

  @OneToMany(type => TestQuestionOption, test => test.test)
  @JoinColumn()
  testResults: TestQuestionOption[];

  @ManyToOne(type => Child, child => child.tests)
  @JoinColumn()
  child: Child;

  @ManyToOne(type => Professional, professional => professional.tests, { nullable: false })
  professional: Professional;

  // @Column()
  // childId: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
