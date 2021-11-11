import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Test } from './test.entity';
import { QuestionOption } from './questionOption.entity';
import { Question } from './question.entity';

@Entity()
export class TestQuestionOption {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(type => Test, test => test.testResults, { nullable: false })
  test: Test;

  @ManyToOne(type => Question, question => question)
  question: Question;

  @Column({type: 'varchar', length: 255, nullable: true})
  resourceUrl: string;

  @Column({type: 'varchar', length: 255, nullable: true})
  resourceType: string;

  @ManyToOne(type => QuestionOption, test => test.testQuestionOption, { nullable: false })
  questionOption: QuestionOption[];

  @Column()
  testId?: number;

  @Column()
  questionId?: number;

  @Column()
  questionOptionId?: number;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
