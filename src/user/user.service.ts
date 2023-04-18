import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindManyOptions } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/userDto';
import { UserImage } from 'src/entities/userImage.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserImage)
    private readonly imageRepository: Repository<UserImage>,
  ) {}

  async user(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneWithEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
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
    const { image, ...res } = data;
    const img = this.imageRepository.create(image);
    const newData = {
      ...res,
      image: img,
    };
    return this.userRepository.create(newData);
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...data });
  }

  async deleteUser(id: string) {
    return this.userRepository.delete({ id });
  }
}
