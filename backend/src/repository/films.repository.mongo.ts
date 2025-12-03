import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, isValidObjectId } from 'mongoose';
import { Film } from '../films/schemas/film.schema';
import { IFilmsRepository } from './films.repository';

@Injectable()
export class FilmsMongoRepository implements IFilmsRepository {
  constructor(@InjectModel(Film.name) private readonly filmModel: Model<Film>) {}

  async getAll() {
    const docs = await this.filmModel.find().lean().exec();
    return docs.map((f) => ({
      id: (f as any).id ? (f as any).id.toString() : (f as any).id,
      rating: (f as any).rating ?? 0,
      director: (f as any).director ?? '',
      tags: (f as any).tags ?? [],
      title: f.title,
      about: f.description ?? '',
      description: f.description ?? '',
      image: f.image ?? '',
      cover: f.cover ?? '',
    }));
  }

  /**
   * Возвращаем расписание как массив объектов, безопасно находя фильм по id.
   * Поддерживаем поиск по _id (ObjectId) и по полю id (string UUID).
   */
  async getSchedule(id: string) {
    let film: any = null;

    // Если id валиден как ObjectId — ищем по _id
    if (isValidObjectId(id)) {
      film = await this.filmModel.findById(id).lean().exec();
    }

    // Если не найдено и/или id не ObjectId — пробуем по полю "id" (например, UUID из stub)
    if (!film) {
      film = await this.filmModel.findOne({ id }).lean().exec();
    }

    if (!film) return [];

    const schedule = (film.schedule ?? []).map((s: any) => ({
      id: s.id ? s.id.toString() : s.id ?? undefined,
      film: film.id ? film.id : (film.id ? film.id.toString() : undefined),
      daytime: s.daytime ?? s.time ?? '',
      hall: s.hall ?? '',
      rows: s.rows ?? 0,
      seats: s.seats ?? 0,
      price: s.price ?? 0,
      taken: s.taken ?? s.seatsTaken ?? s.seats ?? [],
    }));

    return schedule;
  }

  // optional helpers used elsewhere
  async findById(id: string) {
    if (isValidObjectId(id)) {
      return this.filmModel.findById(id).exec();
    }
    return this.filmModel.findOne({ id }).exec();
  }

  async update(id: string, data: any) {
    if (isValidObjectId(id)) {
      return this.filmModel.findByIdAndUpdate(id, data, { new: true }).exec();
    }
    return this.filmModel.findOneAndUpdate({ id }, data, { new: true }).exec();
  }
}
