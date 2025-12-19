import { DynamicModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../typeorm/entities/film.entity';
import { Schedule } from '../typeorm/entities/schedule.entity';

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.DATABASE_HOST || 'localhost',
          port: +(process.env.DATABASE_PORT || 5432),
          username: process.env.DATABASE_USERNAME || 'postgres',
          password: process.env.DATABASE_PASSWORD || 'student',
          database: process.env.DATABASE_NAME || 'prac',
          entities: [Film, Schedule],
          synchronize: false, // обязательно false в реальном проекте
          autoLoadEntities: true,
        }),
      ],
      exports: [TypeOrmModule],
    };
  }
}
