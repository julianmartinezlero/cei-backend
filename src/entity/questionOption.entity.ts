import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Question } from './question.entity';
import { TestQuestionOption } from './testQuestionOption.entity';

@Entity()
export class QuestionOption {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer' })
  value: number;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @ManyToOne(type => Question, question => question.questionOptions)
  question?: Question;

  @Column()
  questionId: number;

  @OneToMany(type => TestQuestionOption, testQuestionOption => testQuestionOption.questionOption)
  testQuestionOption?: TestQuestionOption[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt?: Date;

  @Column({ type: 'timestamp', default: null })
  deleteAt?: Date;
}
