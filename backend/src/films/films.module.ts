import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../typeorm/entities/film.entity';
import { Schedule } from '../typeorm/entities/schedule.entity';
import { FilmsController } from './films.controller';
import { FilmsService } from './films.service';
import { IFilmsRepositoryToken } from '../repository/films.repository';
import { FilmsPgRepository } from '../repository/films.repository.pg';


@Module({
imports: [TypeOrmModule.forFeature([Film, Schedule])],
controllers: [FilmsController],
providers: [
FilmsService,
{ provide: IFilmsRepositoryToken, useClass: FilmsPgRepository },
],
exports: [],
})
export class FilmsModule {}