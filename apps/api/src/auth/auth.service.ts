import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service.ts';
import { PrismaService } from '../prisma/prisma.service.ts';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  login() {}
  register() {}
}
