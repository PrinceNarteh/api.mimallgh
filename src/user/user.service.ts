import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async user(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async users(params: FindManyOptions<User>) {
    const { skip, take, where, order, select } = params;
    return this.userRepository.find({
      skip,
      take,
      where,
      order,
      select,
    });
  }

  async createUser(data: CreateUserDto) {
    return this.userRepository.create(data);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...data });
  }

  async deleteUser(id: string) {
    return this.userRepository.delete({ id });
  }
}
