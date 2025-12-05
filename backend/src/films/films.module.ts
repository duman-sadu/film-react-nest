import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Film, FilmSchema } from './schemas/film.schema';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { IFilmsRepositoryToken } from '../repository/films.repository';
import { FilmsMongoRepository } from '../repository/films.repository.mongo';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Film.name, schema: FilmSchema }]),
  ],
  controllers: [FilmsController],
  providers: [
    FilmsService,
    { provide: IFilmsRepositoryToken, useClass: FilmsMongoRepository },
  ],
})
export class FilmsModule {}
