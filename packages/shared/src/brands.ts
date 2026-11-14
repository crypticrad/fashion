import * as z from 'zod';
import { isoDate, response } from './common.ts';

const Brand = z.object({
  id: z.coerce.number<number>().positive(),
  brand_name: z.string().nonempty(),
  createdAt: isoDate,
  updatedAt: isoDate.nullable()
});

export const BrandResponse = response(z.array(Brand));
export type BrandListResponse = z.input<typeof BrandResponse>;
