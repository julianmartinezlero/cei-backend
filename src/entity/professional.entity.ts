import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Test } from './test.entity';
import { Child } from './child.entity';
import { User } from './user.entity';

@Entity()
export class Professional {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 200 })
  name: string;

  @Column({ type: 'varchar', length: 200 })
  lastName: string;

  @Column({ length: 10, unique: true })
  ci: string;

  @Column({ length: 10, unique: true })
  cell: string;

  // @Column({ length: 100, unique: true })
  // email: string;
  //
  // @Column()
  // password: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  position: string;

  @Column({ type: 'varchar', length: 200, nullable: true })
  profession: string;

  @OneToMany(type => Test, test => test.professional)
  tests?: Test[];

  @OneToMany(type => Child, child => child.professional, { cascade: true, eager: true })
  @JoinColumn()
  children?: Child[];

  @OneToOne(type => User, { nullable: false })
  @JoinColumn()
  user: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
