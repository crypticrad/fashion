import { Controller, Get, UseGuards } from '@nestjs/common';
import { BrandListDto } from './brands.dto.ts';
import { ZodResponse } from 'nestjs-zod';
import { BrandsService } from './brands.service.ts';
import { AuthGuard } from '../../guards/auth.guard.ts';

@Controller('/brands')
@UseGuards(AuthGuard)
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
