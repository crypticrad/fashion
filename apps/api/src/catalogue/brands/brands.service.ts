import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class BrandsService {
  constructor(private readonly prisma: PrismaService) {}
  async list() {
    const brands = await this.prisma.db.orm.public.Brand.all();
    return brands;
  }
}
