/**
 * Seeds brands and products from the CSV exports in `<repo>/seed`.
 *
 *   pnpm --filter @fashion/api db:seed
 *
 * Safe to re-run: rows whose `id` already exists are skipped.
 */
import { readFileSync } from 'node:fs';
import { parse } from 'csv-parse/sync';
import { db } from './db.js';

const SEED_DIR = new URL('../../../../seed/', import.meta.url);

function readCsv<T>(file: string): T[] {
  return parse(readFileSync(new URL(file, SEED_DIR)), {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  }) as T[];
}

function report(label: string, inserted: number, total: number) {
  const skipped = total - inserted;
  console.log(
    `${`${label}:`.padEnd(10)}${inserted} inserted` +
      (skipped ? `, ${skipped} skipped (id already exists)` : ''),
  );
}

const list = (value: string) => value.split('|').filter(Boolean);
const nullable = (value: string) => (value === '' ? null : value);

type BrandRow = {
  id: string;
  brand_name: string;
  createdAt: string;
  updatedAt: string;
};

type ProductRow = {
  id: string;
  name: string;
  description: string;
  product_image: string;
  brand_id: string;
  createdAt: string;
  updatedAt: string;
  gender: string;
  color: string;
  size: string;
  price: string;
  style: string;
  category: string;
};

type ProductInput = Parameters<typeof db.orm.public.Product.createAll>[0][number];

async function seedBrands() {
  const rows = readCsv<BrandRow>('public.brands.csv');
  const inserted = await db.orm.public.Brand.createAndCount(
    rows.map((row) => ({
      id: Number(row.id),
      brand_name: row.brand_name,
      createdAt: new Date(row.createdAt),
      updatedAt: row.updatedAt ? new Date(row.updatedAt) : null,
    })),
    { onConflict: 'skip', conflictOn: ['id'] },
  );
  report('brands', inserted, rows.length);
}

async function seedProducts() {
  const rows = readCsv<ProductRow>('public.products.csv');
  const inserted = await db.orm.public.Product.createAndCount(
    rows.map(
      (row): ProductInput => ({
        id: Number(row.id),
        name: row.name,
        description: nullable(row.description),
        product_image: nullable(row.product_image),
        brand_id: Number(row.brand_id),
        createdAt: new Date(row.createdAt),
        updatedAt: row.updatedAt ? new Date(row.updatedAt) : null,
        gender: list(row.gender) as ProductInput['gender'],
        color: list(row.color),
        size: list(row.size) as ProductInput['size'],
        price: row.price,
        style: row.style as ProductInput['style'],
        category: row.category as ProductInput['category'],
      }),
    ),
    { onConflict: 'skip', conflictOn: ['id'] },
  );
  report('products', inserted, rows.length);
}

/** Ids were inserted explicitly, so move each sequence past the highest id. */
async function resetSequences() {
  await db.execute(
    db.raw.sql`SELECT setval(pg_get_serial_sequence('brands', 'id'), (SELECT MAX(id) FROM brands))`
      .affectedCount()
      .build(),
  );
  await db.execute(
    db.raw.sql`SELECT setval(pg_get_serial_sequence('products', 'id'), (SELECT MAX(id) FROM products))`
      .affectedCount()
      .build(),
  );
}

/** Fields Prisma's structured errors and Postgres driver errors carry beyond `message`. */
const ERROR_FIELDS = [
  'code',
  'severity',
  'why',
  'fix',
  'sqlState',
  'detail',
  'table',
  'column',
  'constraint',
  'details',
  'meta',
  'nextActions',
] as const;

function formatError(error: unknown, depth = 0): string {
  const indent = '  '.repeat(depth);
  if (!(error instanceof Error)) return `${indent}${String(error)}`;

  const lines = [`${indent}${error.name}: ${error.message}`];
  const fields = error as unknown as Record<string, unknown>;
  for (const key of ERROR_FIELDS) {
    const value = fields[key];
    if (value === undefined || value === null || value === '') continue;
    const text = typeof value === 'string' ? value : JSON.stringify(value, null, 2);
    lines.push(`${indent}  ${key}: ${text.replaceAll('\n', `\n${indent}  `)}`);
  }
  if (error.cause !== undefined) {
    lines.push(`${indent}  caused by:`, formatError(error.cause, depth + 2));
  }
  if (depth === 0 && error.stack) {
    lines.push('', error.stack.split('\n').slice(1).join('\n'));
  }
  return lines.join('\n');
}

const steps: [string, () => Promise<void>][] = [
  ['brands', seedBrands],
  ['products', seedProducts],
  ['id sequences', resetSequences],
];

try {
  for (const [name, run] of steps) {
    try {
      await run();
    } catch (error) {
      console.error(`\nSeed failed while seeding ${name}:\n${formatError(error)}`);
      process.exitCode = 1;
      break;
    }
  }
  if (!process.exitCode) console.log('Seed complete.');
} finally {
  await db.close();
}
