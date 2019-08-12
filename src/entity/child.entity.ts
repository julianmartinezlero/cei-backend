import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Tutor } from './tutor.entity';

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  @ManyToOne(type => Tutor, tutor => tutor.children, { nullable: false, onDelete: 'CASCADE' })
  tutor: Tutor;

  @Column()
  tutorId: number;
}
