export const IFilmsRepositoryToken = 'IFilmsRepository';

export interface IFilmsRepository {
  getAll(): Promise<any[]>;
  getSchedule(filmId: string): Promise<any[]>;
  findById?(id: string): Promise<any | null>;
  update?(id: string, data: any): Promise<any>;
}
