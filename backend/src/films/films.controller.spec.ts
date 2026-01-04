import { Test, TestingModule } from '@nestjs/testing';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';

describe('FilmsController', () => {
  let controller: FilmsController;
  let service: jest.Mocked<FilmsService>;

  const filmsMock = [
    { id: '1', title: 'Film 1' },
    { id: '2', title: 'Film 2' },
  ];

  const scheduleMock = [
    { id: '10', time: '10:00' },
    { id: '11', time: '12:00' },
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FilmsController],
      providers: [
        {
          provide: FilmsService,
          useValue: {
            getAll: jest.fn(),
            getSchedule: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get(FilmsController);
    service = module.get(FilmsService) as jest.Mocked<FilmsService>;
  });

  it('should return films list with total', async () => {
    service.getAll.mockResolvedValue(filmsMock as any);

    const result = await controller.getAll();

    expect(service.getAll).toHaveBeenCalled();
    expect(result).toEqual({
      total: filmsMock.length,
      items: filmsMock,
    });
  });

  it('should return schedule by film id', async () => {
    service.getSchedule.mockResolvedValue(scheduleMock as any);

    const result = await controller.getSchedule('1');

    expect(service.getSchedule).toHaveBeenCalledWith('1');
    expect(result).toEqual({
      total: scheduleMock.length,
      items: scheduleMock,
    });
  });
});
