import { Controller, Get, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service.ts';
import { ZodResponse } from 'nestjs-zod';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwt: JwtService,
    private readonly service: UsersService,
  ) {}

  @Post('/login')
  //   @ZodResponse({
  //     type:
  //   })
  login() {}

  @Post('/register')
  register() {}

  @Get('/logout')
  logout() {}
}
