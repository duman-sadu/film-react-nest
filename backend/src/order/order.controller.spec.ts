import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';

describe('OrderController', () => {
  let controller: OrderController;
  let service: jest.Mocked<OrderService>;

  const orderDto: OrderDto = {
    film_id: 'film-id',
    scheduleId: 'schedule-id',
    seats: [
      { row: 1, seat: 1 },
      { row: 1, seat: 2 },
    ],
    email: 'test@example.com',
    phone: '+77001234567',
  };

  const orderResult = {
    id: 'order-id',
    total: 500,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [
        {
          provide: OrderService,
          useValue: {
            createOrder: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(OrderController);
    service = module.get(OrderService) as jest.Mocked<OrderService>;
  });

  it('should create order', async () => {
    service.createOrder.mockResolvedValue(orderResult as any);

    const result = await controller.create(orderDto);

    expect(service.createOrder).toHaveBeenCalledWith(orderDto);
    expect(result).toEqual(orderResult);
  });
});
