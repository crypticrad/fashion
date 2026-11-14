import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { cleanupOpenApiDoc } from 'nestjs-zod';
import { AppModule } from './app.module.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useSecurityHeaders();
  // All routes live under /api so the web app's dev proxy (and any reverse
  // proxy in production) can forward a single path prefix.
  app.setGlobalPrefix('api');

  // Run onModuleDestroy hooks (e.g. closing the Prisma pool) on SIGTERM/SIGINT.
  app.enableShutdownHooks();

  app.enableCors({
    origin: (process.env.CORS_ORIGIN ?? 'http://localhost:5173').split(','),
    credentials: true,
  });

  // OpenAPI docs at /api/docs (JSON at /api/docs-json). nestjs-zod's
  // cleanupOpenApiDoc turns the zod DTO metadata into proper schemas.
  const openApiConfig = new DocumentBuilder()
    .setTitle('Fashion API')
    .setVersion('0.0.1')
    .build();
  const openApiDoc = SwaggerModule.createDocument(app, openApiConfig);
  SwaggerModule.setup('api/docs', app, cleanupOpenApiDoc(openApiDoc));

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
