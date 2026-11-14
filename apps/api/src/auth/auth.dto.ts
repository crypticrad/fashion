import { LoginRequest, RegisterRequest } from '@fashion/shared';
import { createZodDto } from '../common/create-zod-dto.ts';

export class LoginRequestDto extends createZodDto(LoginRequest) {}
export class RegisterRequestDto extends createZodDto(RegisterRequest) {}
