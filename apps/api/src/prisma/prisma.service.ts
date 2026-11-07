import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { db } from './db.js';

/**
 * Exposes the process-wide Prisma client to Nest's dependency injection.
 *
 * The client itself is created once in `db.ts` and connects lazily on the
 * first query, so there is nothing to do on startup. It is closed only when
 * the app shuts down (requires `app.enableShutdownHooks()` in `main.ts`).
 */
@Injectable()
export class PrismaService implements OnModuleDestroy {
  readonly db = db;

  async onModuleDestroy() {
    await this.db.close();
  }
}
