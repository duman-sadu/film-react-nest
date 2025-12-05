import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Film } from '../films/schemas/film.schema';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Film.name) private readonly filmModel: Model<Film>,
  ) {}

  async createOrder(order: OrderDto) {
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(order.email))
      throw new BadRequestException('Invalid email');

    if (!/^\+7\d{10}$/.test(order.phone))
      throw new BadRequestException('Invalid phone');

    if (!Types.ObjectId.isValid(order.filmId)) {
      throw new NotFoundException('Invalid filmId');
    }

    const film = await this.filmModel.findById(order.filmId).exec();
    if (!film) throw new NotFoundException('Film not found');

    const schedule = film.schedule.find((s) => s.id === order.scheduleId);
    if (!schedule) throw new NotFoundException('Schedule not found');

    schedule.taken = schedule.taken ?? [];

    for (const seat of order.seats) {
      const key = `${seat.row}:${seat.seat}`;

      if (schedule.taken.includes(key)) {
        throw new BadRequestException(`Seat already taken: ${key}`);
      }

      schedule.taken.push(key);
    }

    const tickets = order.seats.map((seat) => ({
      id: new Types.ObjectId().toString(),
      film: order.filmId,
      session: schedule.id,
      daytime: schedule.daytime,
      row: seat.row,
      seat: seat.seat,
      price: schedule.price ?? 0,
    }));

    await film.save();

    return {
      total: tickets.length,
      items: tickets,
      email: order.email,
      phone: order.phone,
    };
  }
}
