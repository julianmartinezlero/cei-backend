import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
