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

class SeatDto {
  @Type(() => Number)
  @IsInt()
  @Min(1)
  row: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  seat: number;
}

export class OrderDto {
  @IsString()
  filmId: string;

  @IsString()
  scheduleId: string;

  @IsArray()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => SeatDto)
  seats: SeatDto[];

  @IsEmail()
  email: string;

  @Matches(/^\+7\d{10}$/, {
    message: 'Phone must match +7XXXXXXXXXX format',
  })
  phone: string;
}