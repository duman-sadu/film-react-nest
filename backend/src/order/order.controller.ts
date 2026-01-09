// backend/src/order/order.controller.ts
import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto, TicketDto } from './dto/order.dto';

@Controller('afisha/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() body: any) {
    // Приводим фронтовские данные к DTO
    const order: OrderDto = {
      email: body.email,
      phone: body.phone,
      tickets: (body.tickets || []).map((t: any) => {
        const ticket: TicketDto = {
          film: t.film || '',
          session: t.session || '',
          row: Number(t.row) || 0,
          seat: Number(t.seat) || 0,
          price: Number(t.price) || 0,
          day: t.day || '',
          time: t.time || '',
        };
        return ticket;
      }),
    };

    return this.orderService.createOrder(order);
  }
}
