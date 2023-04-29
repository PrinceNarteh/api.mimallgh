import { Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.users({});
  }

  @Get('/role/:role')
  async findAllByRole(@Param('role') role: string) {
    return this.userService.users({
      where: {
        role,
      },
    });
  }

  @Get(':userId')
  async getUser(@Param('userId') userId: string) {
    return this.userService.user(userId);
  }

  @Put(':userId')
  async updateUser(@Param('userId') userId: string) {
    return `Update user with ID ${userId}`;
  }

  @Put(':userId')
  async deleteUser(@Param('userId') userId: string) {
    return this.userService.deleteUser(userId);
  }
}
