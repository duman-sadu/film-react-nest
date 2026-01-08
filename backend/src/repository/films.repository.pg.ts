import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Film } from '../typeorm/entities/film.entity';
import { Schedule } from '../typeorm/entities/schedule.entity';
import { IFilmsRepository } from './films.repository';

@Injectable()
export class FilmsPgRepository implements IFilmsRepository {
  constructor(
    @InjectRepository(Film)
    private readonly filmRepo: Repository<Film>,
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async getAll(): Promise<any[]> {
    const films = await this.filmRepo.find({ relations: ['schedule'] });

    return films.map((f) => ({
      id: f.id,
      title: f.title,
      description: f.description ?? '',
      image: f.image ?? '',
      cover: f.cover ?? '',
      schedule: (f.schedule ?? []).map((s) => ({
        id: s.id,
        film: f.id,
        daytime: s.daytime,
        hall: s.hall,
        rows: s.rows,
        seats: s.seats,
        price: s.price,
        taken: s.taken,
      })),
    }));
  }

  async getSchedule(film_id: string): Promise<any[]> {
    const film = await this.filmRepo.findOne({
      where: { id: film_id },
      relations: ['schedule'],
    });
    if (!film) return [];

    return (film.schedule ?? []).map((s) => ({
      id: s.id,
      film: film.id,
      daytime: s.daytime,
      hall: s.hall,
      rows: s.rows,
      seats: s.seats,
      price: s.price,
      taken: s.taken ?? [],
    }));
  }

  async findById(id: string): Promise<any | null> {
    return this.filmRepo.findOne({ where: { id }, relations: ['schedule'] });
  }

  async update(id: string, data: any): Promise<any> {
    const film = await this.filmRepo.findOne({ where: { id } });
    if (!film) return null;
    Object.assign(film, data);
    return this.filmRepo.save(film);
  }
}
