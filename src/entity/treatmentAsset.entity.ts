import {Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import {Treatment} from './treatment.entity';

@Entity()
export class TreatmentAsset {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  assetType: string;

  @ManyToOne(() => Treatment, treatment => treatment.treatmentAssets)
  @JoinColumn()
  treatment: Treatment;
}
