import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { ZodSerializerInterceptor, ZodValidationPipe } from 'nestjs-zod';
import { PrismaModule } from './prisma/prisma.module.ts';
import { CatalogueModule } from './catalogue/catalogue.module.js';
import { UsersModule } from './users/users.module.ts';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CatalogueModule,
    UsersModule,
  ],
  providers: [
    // Validates every @Body/@Query/@Param typed with a createZodDto class.
    { provide: APP_PIPE, useClass: ZodValidationPipe },
    // Checks responses of handlers marked @ZodSerializerDto against their schema.
    { provide: APP_INTERCEPTOR, useClass: ZodSerializerInterceptor },
  ],
})
export class AppModule {}
