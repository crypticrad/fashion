import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service.js';
import { randomStringGenerator } from '@nestjs/common/internal';
import { CreateUserDto } from './dto/create-user.dto.js';

@Controller('users')
export class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  listUsers() {
    return this.service.list();
  }

  @Get(':id')
  listUsersById(@Param('id') id: string) {
    return this.service.listById(id);
  }

  @Post()
  createUser(@Body() createUser: CreateUserDto) {
    const id = randomStringGenerator();
    return this.service.create({
      ...createUser,
      id,
    });
  }

  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUser: CreateUserDto) {
    return this.service.update({
      ...updateUser,
      id,
    });
  }

  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
