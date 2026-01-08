export const IFilmsRepositoryToken = 'IFilmsRepository';

export interface IFilmsRepository {
  getAll(): Promise<any[]>;
  getSchedule(film_id: string): Promise<any[]>;
  findById?(id: string): Promise<any | null>;
  update?(id: string, data: any): Promise<any>;
}
