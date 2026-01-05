import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { createLogger } from './logger/logger.factory';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.useLogger(createLogger());

  // ✅ Добавляем transform: true
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true, // <- Важно для корректного преобразования DTO
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix('api/afisha');

  app.enableCors({
    origin: true,
    credentials: true,
  });

  await app.listen(3000, '0.0.0.0');
}
bootstrap();
