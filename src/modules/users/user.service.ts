import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateUserDto } from './dto/userDto';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async user(id: string) {
    const user = await this.prismaService.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { password, ...result } = user;
    return result;
  }

  async findOneByEmailOrPhoneNumber(emailOrPhoneNumber: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        OR: [
          { email: emailOrPhoneNumber },
          { phoneNumber: emailOrPhoneNumber },
        ],
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async getUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
    include?: Prisma.UserInclude;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy, include } = params;
    return await this.prismaService.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
      include: {
        image: true,
        ...include,
      },
    });
  }

  async createUser(data: any) {
    const emailOrPhoneNumberExist = await this.prismaService.user.findFirst({
      where: {
        OR: [{ email: data.email }, { phoneNumber: data.phoneNumber }],
      },
    });

    if (emailOrPhoneNumberExist) {
      throw new BadRequestException('Email or Phone number already in used.');
    }

    const { image, ...res } = data;
    if (image) {
      const user = await this.prismaService.user.create({
        data: {
          ...data,
          image: {
            create: {
              ...data.image,
            },
          },
        },
      });
      const { password, ...result } = user;
      return result;
    } else {
      const user = await this.prismaService.user.create(data);
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
