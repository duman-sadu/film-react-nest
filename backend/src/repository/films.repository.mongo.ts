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
  return docs.map(f => ({
    id: f._id.toString(),
    title: f.title,
    description: f.description ?? '',
    image: f.image ?? '',
    cover: f.cover ?? '',
    schedule: f.schedule ?? [],
    }));
  }

  async getSchedule(id: string) {
    let film: any = null;

    if (isValidObjectId(id)) {
      film = await this.filmModel.findById(id).lean().exec();
    }

    if (!film) {
      film = await this.filmModel.findOne({ id }).lean().exec();
    }

    if (!film) return [];

    return (film.schedule ?? []).map((s: any) => ({
      id: s.id ?? undefined,
      film: film._id.toString(),
      daytime: s.daytime ?? s.time ?? '',
      hall: s.hall ?? '',
      rows: s.rows ?? 0,
      seats: s.seats ?? 0,
      price: s.price ?? 0,
      taken: s.taken ?? [],
    }));
  }

  async findById(id: string) {
    if (isValidObjectId(id)) return this.filmModel.findById(id).exec();
    return this.filmModel.findOne({ id }).exec();
  }

  async update(id: string, data: any) {
    if (isValidObjectId(id)) return this.filmModel.findByIdAndUpdate(id, data, { new: true }).exec();
    return this.filmModel.findOneAndUpdate({ id }, data, { new: true }).exec();
  }
}
