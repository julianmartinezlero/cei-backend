import {Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {TreatmentChild} from './treatmentChild.entity';
import {TreatmentAsset} from './treatmentAsset.entity';
import {TreatmentChildSession} from './treatmentChildSession.entity';
import {tryCatch} from 'rxjs/internal-compatibility';

@Entity()
export class Treatment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  range: number;

  @Column({ type: 'longtext' })
  text;

  @Column({ type: 'longtext' })
  shortText;

  @Column({ type: 'int', default: 0, nullable: true })
  sessions: number;

  @Column({ type: 'int', default: 0, nullable: true })
  week: number;

  @Column({ type: 'int', default: 0, nullable: true })
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
