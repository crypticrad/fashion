import { z } from 'zod';

/** `?page=2&pageSize=20`. Query strings arrive as text, so coerce to numbers. */
export const PaginationQuery = z.object({
  page: z.coerce.number().positive().default(1),
  pageSize: z.coerce.number().positive().max(100).default(20)
});
export type PaginationQuery = z.infer<typeof PaginationQuery>;

/** Wraps any item schema in the standard paginated envelope. */
export const paginated = <T extends z.ZodType>(item: T) =>
  z.object({
    items: z.array(item),
    page: z.number().positive(),
    pageSize: z.number().positive(),
    total: z.number().positive()
  });

/**
 * ISO 8601 string on the wire, Date in code. The API's DTOs run in codec mode,
 * so requests decode string → Date and responses encode Date → string.
 */
export const isoDate = z.codec(z.iso.datetime(), z.date(), {
  decode: (s) => new Date(s),
  encode: (d) => d.toISOString()
});

export const response = <T extends z.ZodType>(data: T) =>
  z.object({
    data,
    success: z.boolean(),
    message: z.string()
  });
