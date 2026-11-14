import {
  LoginResponse,
  LoginRequest,
  RegisterResponse,
  RegisterRequest,
} from '@fashion/shared';
import { createZodDto } from '../common/create-zod-dto.ts';

export class LoginRequestDto extends createZodDto(LoginRequest) {}
export class RegisterRequestDto extends createZodDto(RegisterRequest) {}

export class LoginResponseDto extends createZodDto(LoginResponse) {}
export class RegisterResponseDto extends createZodDto(RegisterResponse) {}
