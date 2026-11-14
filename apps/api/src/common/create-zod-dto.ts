import { createZodDto as baseCreateZodDto, type ZodDto } from 'nestjs-zod';

type Schema = Parameters<typeof baseCreateZodDto>[0];

/**
 * nestjs-zod's createZodDto with codecs always on: requests are `parse`d,
 * responses are `encode`d (so e.g. `isoDate` turns a Date into an ISO string).
 * Use this instead of importing createZodDto from nestjs-zod (lint-enforced).
 */
export function createZodDto<TSchema extends Schema>(
  schema: TSchema,
): ZodDto<TSchema, true> {
  return baseCreateZodDto(schema, { codec: true });
}
