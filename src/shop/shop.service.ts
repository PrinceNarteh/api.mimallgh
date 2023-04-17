import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { CreateShopDto, UpdateShopDto } from './dto/shopDto';
import { Shop } from '../entities/shop.entity';

@Injectable()
export class ShopService {
  constructor(
    @InjectRepository(Shop) private readonly shopRepository: Repository<Shop>,
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

  async createShop(data: CreateShopDto) {
    return this.shopRepository.create(data);
  }

  async updateShop(id: string, data: UpdateShopDto) {
    return this.shopRepository.update({ id }, { ...data });
  }

  async deleteShop(id: string) {
    return this.shopRepository.delete({ id });
  }
}
