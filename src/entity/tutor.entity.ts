import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tutor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type: 'varchar', length: 200})
  name: string;

  @Column({type: 'varchar', length: 200})
  lastName: string;

  @Column({length: 10, unique: true})
  ci: string;

  @Column({length: 10, unique: true})
  cell: string;

  @Column({length: 100, unique: true})
  email: string;

  @Column()
  password: string;

  @CreateDateColumn({type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({type: 'timestamp'})
  updatedAt: Date;
}
