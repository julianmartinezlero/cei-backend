import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { QuestionOption } from './questionOption.entity';
import { QuestionAsset } from './questionAsset.entity';
import { TestQuestionOption } from './testQuestionOption.entity';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 300 })
  question: string;

  @Column({ type: 'varchar', length: 300 })
  details: string;

  // @Column({ type: 'boolean', default: false})
  // withResource: boolean;

  @Column({ type: 'varchar', length: 20 })
  questionType: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @OneToMany(type => QuestionOption, options => options.question)
  @JoinColumn()
  questionOptions?: QuestionOption[];

  @OneToMany(type => TestQuestionOption, options => options.test)
  @JoinColumn()
  testQuestionOption?: TestQuestionOption[];

  @OneToMany(type => QuestionAsset, options => options.question)
  @JoinColumn()
  questionAssets?: QuestionAsset[];
}
