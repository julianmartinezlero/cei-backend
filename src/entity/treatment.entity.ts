import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TreatmentChild} from './treatmentChild.entity';
import {TreatmentAsset} from './treatmentAsset.entity';
import {TreatmentChildSession} from './treatmentChildSession.entity';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  range: number;

  @Column({ type: 'longtext' })
  text;

  @Column({ type: 'int', default: 0 })
  sessions: number;

  @Column({ type: 'int', default: 0 })
  week: number;

  @Column({ type: 'int', default: 0 })
  month: number;

  @OneToMany(type => TreatmentChild, treatmentChild => treatmentChild.treatment)
  @JoinColumn()
  treatmentChildren?: TreatmentChild[];

  @OneToMany(type => TreatmentChildSession, treatmentChild => treatmentChild.treatment)
  @JoinColumn()
  treatmentChildSessions?: TreatmentChildSession[];

  @OneToMany(type => TreatmentAsset, treatmentAsset => treatmentAsset.treatment)
  @JoinColumn()
  treatmentAssets?: TreatmentAsset[];
}
