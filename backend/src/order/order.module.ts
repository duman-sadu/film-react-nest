import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Schedule } from '../typeorm/entities/schedule.entity';
import { Film } from '../typeorm/entities/film.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, Film]),
  ],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [TypeOrmModule],
})
export class OrderModule {}
