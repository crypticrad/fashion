import { Body, Controller, Get, NotFoundException, Post } from '@nestjs/common';
import { ZodResponse } from 'nestjs-zod';
import {
  LoginRequestDto,
  LoginResponseDto,
  RegisterRequestDto,
  RegisterResponseDto,
} from './auth.dto.ts';
import { AuthService } from './auth.service.ts';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ZodResponse({
    type: LoginResponseDto,
  })
  async login(@Body() body: LoginRequestDto) {
    const data = await this.authService.login(body);
    if (data?.user) {
      return {
        data: {
          user: data?.user,
          access_token: data?.access_token,
          refresh_token: data?.refresh_token,
          permissions: null,
        },
        message: 'logged in successfully',
        success: true,
      };
    }
    throw new NotFoundException('Unable to find user');
  }

  @Post('/register')
  @ZodResponse({
    type: RegisterResponseDto,
  })
  async register(@Body() body: RegisterRequestDto) {
    const user = await this.authService.register(body);
    if (user) {
      return {
        data: {
          user: user,
        },
        message: 'logged in successfully',
        success: true,
      };
    }
    throw new NotFoundException('Unable to register user');
  }

  @Get('/logout')
  logout() {}
}
