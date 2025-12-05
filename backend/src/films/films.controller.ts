import { Controller, Get, Param } from '@nestjs/common';
import { FilmsService } from './films.service';

@Controller('films')
export class FilmsController {
  constructor(private readonly service: FilmsService) {}

  @Get()
  async getAll() {
    const items = await this.service.getAll();
    return { total: items.length, items };
  }

  @Get(':id/schedule')
  async getSchedule(@Param('id') id: string) {
    const items = await this.service.getSchedule(id);
    return { total: items.length, items };
  }
}
