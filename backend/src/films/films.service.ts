import { Inject, Injectable } from '@nestjs/common';
import { IFilmsRepository, IFilmsRepositoryToken } from '../repository/films.repository';

@Injectable()
export class FilmsService {
  constructor(
    @Inject(IFilmsRepositoryToken)
    private readonly repository: IFilmsRepository
  ) {}

  getAll() {
    return this.repository.getAll();
  }

  getSchedule(id: string) {
    return this.repository.getSchedule(id);
  }
}
