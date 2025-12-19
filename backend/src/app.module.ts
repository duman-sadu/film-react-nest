import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { FilmsModule } from './films/films.module';
import { OrderModule } from './order/order.module';
import { DatabaseModule } from './database/database.module';
import { AppController } from './app.controller';


@Module({
imports: [
DatabaseModule.forRoot(),
ServeStaticModule.forRoot({
rootPath: join(process.cwd(), 'public', 'content', 'afisha'),
serveRoot: '/content/afisha',
}),
FilmsModule,
OrderModule,
],
controllers: [AppController],
})
export class AppModule {}