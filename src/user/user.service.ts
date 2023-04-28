import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserImage } from 'src/entities/userImage.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserImage)
    private readonly userImgRepo: Repository<UserImage>,
  ) {}

  async user(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = user;
    return result;
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
    const emailOrPhoneNumberExist = await this.userRepository.findOne({
      where: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
    });

    if (emailOrPhoneNumberExist) {
      throw new BadRequestException('Email or Phone number already in used.');
    }

    const { image, ...res } = data;
    if (image) {
      const img = this.userImgRepo.create(image);
      await this.userImgRepo.save(img);
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

  async updateUser(userId: string, data: UpdateUserDto) {
    let user = await this.user(userId);

    if (!user) {
      throw new BadRequestException('User not found');
    }

    const { image, ...res } = data;

    if (image) {
      await this.userImgRepo.delete({ id: data.image.id });
      const img = this.userImgRepo.create(image);
      await this.userImgRepo.save(img);
      const newData = {
        ...res,
        image: img,
      };
      await this.userRepository.update({ id: userId }, newData);
      user = await this.user(userId);
      return user;
    } else {
      await this.userRepository.update({ id: userId }, data);
      user = await this.user(userId);
      return user;
    }
  }

  async deleteUser(id: string) {
    return this.userRepository.delete({ id });
  }
}
