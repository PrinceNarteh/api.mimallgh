import { Injectable, ForbiddenException } from '@nestjs/common';
import { Repository, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/productDto';
import { Product } from '../entities/product.entity';
import { Shop } from 'src/entities/shop.entity';
import { ShopService } from 'src/shop/shop.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async product(id: string) {
    return this.productRepo.findOne({ where: { id } });
  }

  async products(params: FindManyOptions<Product>) {
    const { skip, take, where, order, select } = params;
    return this.productRepo.find({
      skip,
      take,
      where,
      order,
      select,
    });
  }

  async createProduct(shop: Shop, data: CreateProductDto) {
    const product = this.productRepo.create({
      ...data,
      shopId: shop,
    });

    await this.productRepo.save(product);

    return product;
  }

  async updateProduct(shop: Shop, id: string, data: UpdateProductDto) {
    if (shop.id !== data.shopId.id) {
      throw new ForbiddenException(
        'You are not permitted to perform this action',
      );
    }
    return this.productRepo.update({ id: id }, { ...data });
  }

  async deleteProduct(id: string) {
    return this.productRepo.delete({ id });
  }
}
