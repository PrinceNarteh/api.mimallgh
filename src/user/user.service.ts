import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/userDto';
import { UserImageService } from 'src/user/user_image.service';
import { UserImage } from 'src/entities/userImage.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(UserImage)
    private readonly userImgRepo: Repository<UserImage>,
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

  async updateUser(id: string, data: UpdateUserDto) {
    return this.userRepository.update({ id }, { ...data });
  }

  async deleteUser(id: string) {
    return this.userRepository.delete({ id });
  }
}
