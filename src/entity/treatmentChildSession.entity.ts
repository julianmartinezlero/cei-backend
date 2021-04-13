import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Treatment} from './treatment.entity';
import {Test} from './test.entity';

@Entity()
export class TreatmentChildSession {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean', default: false })
  state: boolean;

  @Column({ type: 'date' })
  dateIni: string;

  @Column({ type: 'date' })
  dateEnd: string;

  @Column({ type: 'varchar', length: 50, default: 'purple-event' })
  classColor: string;

  @ManyToOne(() => Treatment, treatment => treatment.treatmentChildSessions)
  @JoinColumn()
  treatment: Treatment;

  @ManyToOne(() => Test, test => test.treatmentChildSessions)
  @JoinColumn()
  test: Test;
}
