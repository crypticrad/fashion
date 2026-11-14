import { BrandResponse } from '@fashion/shared';
import { createZodDto } from '../../common/create-zod-dto.ts';

export class BrandListDto extends createZodDto(BrandResponse) {}
