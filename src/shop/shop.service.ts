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

  async findShopByShopCode(shopCode: string): Promise<Shop | null> {
    return this.shopRepository.findOne({ where: { shopCode } });
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

  async createShop(data: CreateShopDto) {
    try {
      const shop = this.shopRepository.create(data);
      await this.shopRepository.save(shop);
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
