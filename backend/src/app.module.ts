import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    // Подключение к PostgreSQL через TypeORM
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadEntities: true,       // автоматически загружает все entity
      synchronize: true,            // только для dev! на prod лучше миграции
    }),

    // Статика для контента
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'public', 'content', 'afisha'),
      serveRoot: '/content/afisha',
    }),

    // Модули приложения
    FilmsModule,
    OrderModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
