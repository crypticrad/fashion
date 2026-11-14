import {
  CreateUser,
  UpdateUser,
  UserList,
  UserResponse,
} from '@fashion/shared';
import { createZodDto } from '../common/create-zod-dto.ts';

export class UserListDto extends createZodDto(UserList) {}

export class UserResponseDto extends createZodDto(UserResponse) {}

export class CreateUserDto extends createZodDto(CreateUser) {}

export class UpdateUserDto extends createZodDto(UpdateUser) {}
