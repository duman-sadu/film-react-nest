import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
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
    // Валидация email и телефона (дублируется с DTO, но для безопасности)
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(order.email))
      throw new BadRequestException('Invalid email');

    if (!/^\+7\d{10}$/.test(order.phone))
      throw new BadRequestException('Invalid phone');

    if (
      !order.tickets ||
      !Array.isArray(order.tickets) ||
      order.tickets.length === 0
    )
      throw new BadRequestException('Tickets must be a non-empty array');

    // Берём schedule по первой записи
    const scheduleId = order.tickets[0].session;
    const schedule = await this.scheduleRepo.findOne({
      where: { id: scheduleId },
      relations: ['film'],
    });

    if (!schedule) throw new NotFoundException('Schedule not found');

    schedule.taken = schedule.taken ?? [];

    // Проверка занятости мест
    for (const ticket of order.tickets) {
      if (ticket.row == null || ticket.seat == null)
        throw new BadRequestException('Ticket row and seat must be provided');

      const key = `${ticket.row}:${ticket.seat}`;
      if (schedule.taken.includes(key)) {
        throw new BadRequestException(`Seat already taken: ${key}`);
      }
      schedule.taken.push(key);
    }

    // Сохраняем обновлённый schedule
    await this.scheduleRepo.save(schedule);

    // Генерируем билеты для ответа
    const tickets = order.tickets.map((ticket) => ({
      id: randomUUID(),
      film: schedule.film?.id ?? ticket.film ?? null,
      session: schedule.id,
      daytime: schedule.daytime,
      row: ticket.row,
      seat: ticket.seat,
      price: schedule.price ?? 0,
      day: ticket.day,
      time: ticket.time,
    }));

    return {
      total: tickets.length,
      items: tickets,
      email: order.email,
      phone: order.phone,
    };
  }
}
