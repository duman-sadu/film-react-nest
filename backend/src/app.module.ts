import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DatabaseModule } from './database/database.module';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { AppController } from './app.controller';

@Module({
  imports: [
    DatabaseModule.forRoot(), // подключение БД через отдельный модуль

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
