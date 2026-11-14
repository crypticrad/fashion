import { Module } from '@nestjs/common';
import { BrandsController } from './brands/brands.controller.js';
import { BrandsService } from './brands/brands.service.js';

@Module({
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class CatalogueModule {}
