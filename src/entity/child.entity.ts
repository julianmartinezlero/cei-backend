import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Test } from './test.entity';
import { Professional } from './professional.entity';

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

  @ManyToOne(type => Professional, tutor => tutor.children, { nullable: false })
  professional: Professional;
  // professionalId: number;

  @OneToMany(type => Test, test => test.child)
  @JoinColumn()
  tests: Test[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
