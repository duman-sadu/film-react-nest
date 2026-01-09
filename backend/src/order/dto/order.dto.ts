import {
  IsString,
  IsArray,
  ArrayNotEmpty,
  IsEmail,
  Matches,
  ValidateNested,
  IsInt,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

/* eslint-disable @typescript-eslint/no-unused-vars */
// Класс для одного билета
export class TicketDto {
  @IsString()
  film: string;

  @IsString()
  session: string;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  row: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  seat: number;

  @IsInt()
  price: number;

  @IsString()
  day: string;

  @IsString()
  time: string;
}

// Основной DTO заказа
export class OrderDto {
  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TicketDto) // ← здесь используется TicketDto
  tickets: TicketDto[];

  @IsEmail()
  email: string;

  @Matches(/^\+7\d{10}$/, {
    message: 'Phone must match +7XXXXXXXXXX format',
  })
  phone: string;
}
