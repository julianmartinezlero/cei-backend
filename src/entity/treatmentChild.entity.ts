import {Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import {Treatment} from './treatment.entity';
import {Test} from './test.entity';

@Entity()
export class TreatmentChild {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Treatment, treatment => treatment.treatmentChildren)
  treatment: Treatment;

  @ManyToOne( () => Test, test => test.treatmentChildren)
  test: Test;

  @Column({type: 'boolean', default: false})
  isComplete: boolean;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
