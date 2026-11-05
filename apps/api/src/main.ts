import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    instrument: ObserveInstrument,
  });

  // All routes live under /api so the web app's dev proxy (and any reverse
  // proxy in production) can forward a single path prefix.
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? 'http://localhost:5173').split(','),
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
