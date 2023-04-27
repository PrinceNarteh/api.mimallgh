import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Shop } from '../entities/shop.entity';
import { CreateShopDto, UpdateShopDto } from './dto/shopDto';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
  ) {}

  async shop(id: string): Promise<Shop | null> {
    const shop = await this.shopRepository.findOne({
      where: { id },
      relations: {
        products: {
          images: true,
        },
      },
    });

    if (!shop) {
      throw new NotFoundException('Shop Not Found');
    }
    return shop;
  }

  async findShopByShopCode(shopCode: string): Promise<Shop | null> {
    return this.shopRepository.findOne({ where: { shopCode } });
  }

  async shops(params: FindManyOptions<Shop>): Promise<Shop[]> {
    const { skip, take, where, order, select, relations } = params;
    return await this.shopRepository.find({
      skip,
      take,
      where,
      order,
      select,
      relations,
    });
  }

  async createShop(data: CreateShopDto) {
    try {
      const shop = this.shopRepository.create({
        ...data,
        products: [],
      });
      await this.shopRepository.save(shop);
      return shop;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateShop(shopId: string, data: UpdateShopDto) {
    const shop = await this.shop(shopId);
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }
    await this.shopRepository.update({ id: shopId }, { ...data });
    return this.shop(shopId);
  }

  async deleteShop(id: string) {
    return this.shopRepository.delete({ id });
  }
}
