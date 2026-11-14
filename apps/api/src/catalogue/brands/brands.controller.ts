import { Controller, Get } from '@nestjs/common';
import { BrandListDto } from './brands.dto.ts';
import { ZodResponse } from 'nestjs-zod';
import { BrandsService } from './brands.service.ts';

@Controller('/brands')
export class BrandsController {
  constructor(private brandService: BrandsService) {}

  @Get()
  @ZodResponse({
    type: BrandListDto,
  })
  async listAllBrands() {
    const brands = await this.brandService.list();
    return {
      data: brands,
      success: true,
      message: 'fetched brand list successfully',
    };
  }
}
