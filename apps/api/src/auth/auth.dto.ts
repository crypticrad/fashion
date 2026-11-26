import {
  LoginResponse,
  LoginRequest,
  RegisterResponse,
  RegisterRequest,
  RefreshRequest,
  RefreshResponse,
  LogoutResponse,
  LogoutRequest,
} from '@fashion/shared';
import { createZodDto } from '../common/create-zod-dto.ts';

export class LoginRequestDto extends createZodDto(LoginRequest) {}
export class RegisterRequestDto extends createZodDto(RegisterRequest) {}
export class RefreshRequestDto extends createZodDto(RefreshRequest) {}
export class LogoutRequestDto extends createZodDto(LogoutRequest) {}

export class LoginResponseDto extends createZodDto(LoginResponse) {}
export class RegisterResponseDto extends createZodDto(RegisterResponse) {}
export class RefreshResponseDto extends createZodDto(RefreshResponse) {}
export class LogoutResponseDto extends createZodDto(LogoutResponse) {}
