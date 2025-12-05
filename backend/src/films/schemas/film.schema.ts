import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class FilmSchedule {
  @Prop({ required: true })
  id: string; 

  @Prop({ required: true })
  daytime: string;

  @Prop()
  hall?: string;

  @Prop({ default: 0 })
  rows?: number;

  @Prop({ default: 0 })
  seats?: number;

  @Prop({ default: 0 })
  price?: number;

  @Prop({ type: [String], default: [] })
  taken?: string[];
}

export const FilmScheduleSchema = SchemaFactory.createForClass(FilmSchedule);

@Schema()
export class Film extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ default: '' })
  description: string;

  @Prop({ default: '' })
  image: string;

  @Prop({ default: '' })
  cover: string;

  @Prop({ type: [FilmScheduleSchema], default: [] })
  schedule: FilmSchedule[];
}

export const FilmSchema = SchemaFactory.createForClass(Film);
