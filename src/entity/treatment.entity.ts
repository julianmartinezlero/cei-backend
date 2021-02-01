import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TreatmentChild} from './treatmentChild.entity';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  range: number;

  @Column({ type: 'longtext' })
  text;

  @Column({ type: 'int' })
  sessions: number;

  @OneToMany(type => TreatmentChild, treatmentChild => treatmentChild.treatment)
  @JoinColumn()
  treatmentChildren: TreatmentChild[];
}
