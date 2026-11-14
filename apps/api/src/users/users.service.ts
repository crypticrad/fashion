import { Injectable, Param } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.ts';
import { CreateUserDto, UpdateUserDto } from './users.dto.ts';
import { hash } from '@node-rs/argon2';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async list() {
    const users = await this.prisma.db.orm.public.User.all();
    return users;
  }
  async listById(id: string) {
    return await this.prisma.db.orm.public.User.where({ id }).first();
  }
  async listByEmail(email: string) {
    return await this.prisma.db.orm.public.User.where({ email }).first();
  }
  async create(user: CreateUserDto) {
    const password = await hash(user.password);
    return await this.prisma.db.orm.public.User.create({
      ...user,
      password,
    });
  }
  async update(user: UpdateUserDto, id: string) {
    return await this.prisma.db.orm.public.User.where({ id }).update({
      ...user,
    });
  }
  async delete(id: string) {
    try {
      const deleted = await this.prisma.db.orm.public.User.where({
        id,
      }).delete();
      if (deleted) {
        return `${deleted?.first_name} ${deleted?.last_name} has been deleted`;
      }
      return undefined;
    } catch (error) {
      return undefined;
    }
  }
}
