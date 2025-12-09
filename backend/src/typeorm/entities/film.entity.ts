import { Entity, Column, PrimaryGeneratedColumn, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Schedule } from './schedule.entity';


@Entity({ name: 'films' })
export class Film {
@PrimaryGeneratedColumn('uuid')
id: string;


@Column({ type: 'text' })
title: string;


@Column({ type: 'text', default: '' })
description: string;


@Column({ type: 'text', default: '' })
image: string;


@Column({ type: 'text', default: '' })
cover: string;


@OneToMany(() => Schedule, (schedule) => schedule.film, { cascade: true })
schedule: Schedule[];


@CreateDateColumn({ name: 'created_at' })
createdAt: Date;


@UpdateDateColumn({ name: 'updated_at' })
updatedAt: Date;
}