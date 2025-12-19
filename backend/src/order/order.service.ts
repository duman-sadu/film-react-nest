import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../typeorm/entities/schedule.entity';
import { OrderDto } from './dto/order.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepo: Repository<Schedule>,
  ) {}

  async createOrder(order: OrderDto) {
    // email validation
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(order.email))
      throw new BadRequestException('Invalid email');

    // phone validation
    if (!/^\+7\d{10}$/.test(order.phone))
      throw new BadRequestException('Invalid phone');

    // load schedule with film
    const schedule = await this.scheduleRepo.findOne({
      where: { id: order.scheduleId },
      relations: ['film'],
    });

    if (!schedule) throw new NotFoundException('Schedule not found');

    // ensure taken exists
    schedule.taken = schedule.taken ?? [];

    // check seats
    for (const seat of order.seats) {
      const key = `${seat.row}:${seat.seat}`;
      if (schedule.taken.includes(key)) {
        throw new BadRequestException(`Seat already taken: ${key}`);
      }
      schedule.taken.push(key);
    }

    // save updated schedule
    await this.scheduleRepo.save(schedule);

    // generate tickets
    const tickets = order.seats.map((seat) => ({
      id: randomUUID(),
      film: schedule.film?.id ?? null,
      session: schedule.id,
      daytime: schedule.daytime,
      row: seat.row,
      seat: seat.seat,
      price: schedule.price ?? 0,
    }));

    return {
      total: tickets.length,
      items: tickets,
      email: order.email,
      phone: order.phone,
    };
  }
}
