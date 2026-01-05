import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Film } from './film.entity';

@Entity({ name: 'schedules' })
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Film, (film) => film.schedule, { onDelete: 'CASCADE' })
  film: Film;

  @Column({ type: 'timestamptz' })
  daytime: Date;

  @Column({ type: 'integer', default: 0 })
  hall: number;

  @Column({ type: 'integer', default: 0 })
  rows: number;

  @Column({ type: 'integer', default: 0 })
  seats: number;

  @Column({ type: 'integer', default: 0 })
  price: number;

  @Column('text', {
    array: true,
    default: () => 'ARRAY[]::text[]',
  })
  taken: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
