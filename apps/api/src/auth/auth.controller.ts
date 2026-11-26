import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ZodResponse } from 'nestjs-zod';
import {
  LoginRequestDto,
  LoginResponseDto,
  LogoutRequestDto,
  LogoutResponseDto,
  RefreshRequestDto,
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

  @Post('/refresh')
  @ZodResponse({
    type: LoginResponseDto,
  })
  async refreshToken(@Body() body: RefreshRequestDto) {
    if (!body.refresh_token)
      throw new NotFoundException('No refresh token found');
    const response = await this.authService.refresh(body.refresh_token);
    if (!response?.user) {
      throw new UnauthorizedException('Unable to serve request');
    }
    return {
      data: {
        user: response?.user,
        access_token: response?.access_token,
        refresh_token: response?.refresh_token,
        permissions: null,
      },
      message: 'tokens refreshed successfully',
      success: true,
    };
  }

  @Post('/logout')
  @ZodResponse({
    type: LogoutResponseDto,
  })
  logout(@Body() body: LogoutRequestDto) {
    const response = this.authService.logout(body.access_token);
    if (!response) throw new UnauthorizedException('Invalid user token');
    return {
      data: {
        userId: response,
      },
      message: 'logged out succesfully',
      success: true,
    };
  }
}
