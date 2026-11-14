import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service.ts';
import { ZodResponse } from 'nestjs-zod';
import {
  CreateUserDto,
  UpdateUserDto,
  UserListDto,
  UserResponseDto,
} from './users.dto.ts';
import { AuthGuard } from '../guards/auth.guard.ts';

@Controller('/users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('')
  @ZodResponse({
    type: UserListDto,
  })
  async listAllUsers() {
    const users = await this.usersService.list();
    return {
      data: users,
      success: true,
      message: 'fetched user list successfully',
    };
  }

  @Post()
  @ZodResponse({
    type: UserResponseDto,
  })
  async createUser(@Body() createUser: CreateUserDto) {
    const user = await this.usersService.create(createUser);
    return {
      data: user,
      success: true,
      message: 'created user successfully',
    };
  }

  @Put(':id')
  @ZodResponse({
    type: UserResponseDto,
  })
  async updateUser(@Body() updateUser: UpdateUserDto, @Param('id') id: string) {
    const user = await this.usersService.update(updateUser, id);
    return {
      data: user,
      success: true,
      message: 'updated user successfully',
    };
  }

  @Delete(':id')
  @ZodResponse({
    type: UserResponseDto,
  })
  async deleteUser(@Param('id') id: string) {
    const message = await this.usersService.delete(id);
    if (!message) throw new NotFoundException('Failed to delete user');
    return {
      data: null,
      success: true,
      message,
    };
  }
}
