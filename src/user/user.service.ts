import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/userDto';
import { UserImageService } from 'src/user-image/user-image.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly userImgService: UserImageService,
  ) {}

  async user(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async findOneByEmailOrPhoneNumber(emailOrPhoneNumber: string) {
    return this.userRepository.findOne({
      where: [
        { email: emailOrPhoneNumber },
        { phoneNumber: emailOrPhoneNumber },
      ],
    });
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
    if (image) {
      const img = await this.userImgService.create(image);
      const newData = {
        ...res,
        image: img,
      };
      const user = this.userRepository.create(newData);
      await this.userRepository.save(user);
      const { password, ...result } = user;
      return result;
    } else {
      const user = this.userRepository.create(data);
      await this.userRepository.save(user);
      const { password, ...result } = user;
      return result;
    }
  }

  async updateUser(id: string, data: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...data });
  }

  async deleteUser(id: string) {
    return this.userRepository.delete({ id });
  }
}
