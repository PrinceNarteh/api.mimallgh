import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return 'All users';
  }

  @Post()
  async createUser() {
    return 'User created';
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.user({ id: userId });
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: string) {
    return `Update user with ID ${userId}`;
  }

  @Put(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser({ id: userId });
  }
}
