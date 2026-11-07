import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // All routes live under /api so the web app's dev proxy (and any reverse
  // proxy in production) can forward a single path prefix.
  app.setGlobalPrefix('api');

  // Run onModuleDestroy hooks (e.g. closing the Prisma pool) on SIGTERM/SIGINT.
  app.enableShutdownHooks();

  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? 'http://localhost:5173').split(','),
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
