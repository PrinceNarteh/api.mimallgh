import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { CreateShopDto, UpdateShopDto } from './dto/shopDto';
import { Shop } from '../entities/shop.entity';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
    private readonly userService: UserService,
  ) {}

  async shop(id: string): Promise<Shop | null> {
    return this.shopRepository.findOne({ where: { id } });
  }

  async shops(params: FindManyOptions<Shop>): Promise<Shop[]> {
    const { skip, take, where, order, select } = params;
    return this.shopRepository.find({
      skip,
      take,
      where,
      order,
      select,
    });
  }

  async createShop(user: User, data: CreateShopDto) {
    try {
      const owner = await this.userService.user(user.id);
      if (!owner) {
        throw new NotFoundException('User not found');
      }

      let shop = this.shopRepository.create({
        ...data,
        ownerId: owner,
      });

      await this.shopRepository.save(shop);

      await this.userService.updateUser(owner.id, {
        role: 'seller',
        shopId: shop,
      });

      return shop;
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error.message);
    }
  }

  async updateShop(id: string, data: UpdateShopDto) {
    return this.shopRepository.update({ id }, { ...data });
  }

  async deleteShop(id: string) {
    return this.shopRepository.delete({ id });
  }
}
