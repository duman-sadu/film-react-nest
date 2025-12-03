import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Schedule extends Document {
  @Prop({ required: true })
  id: string; // UUID

  @Prop({ required: true })
  filmId: string; // UUID фильма

  @Prop()
  daytime: string;

  @Prop()
  hall: string;

  @Prop()
  rows: number;

  @Prop()
  seats: number;

  @Prop()
  price: number;

  @Prop({ type: [String], default: [] })
  taken: string[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
