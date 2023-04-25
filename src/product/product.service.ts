import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Shop } from 'src/entities/shop.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/productDto';
import { ProductImage } from 'src/entities/productImage.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(ProductImage)
    private readonly productImgRepo: Repository<ProductImage>,
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
      relations: {
        images: true,
      },
    });
  }

  async createProduct(shop: Shop, data: CreateProductDto) {
    const { images } = data;
    const imageArr = [];

    for (let image of images) {
      const res = this.productImgRepo.create(image);
      await this.productImgRepo.save(res);
      imageArr.push(res);
    }

    const product = this.productRepo.create({
      ...data,
      shopId: shop,
      images: imageArr,
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

  async deleteProduct(shop: Shop, id: string) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (product && shop.id !== product.shopId.id) {
      throw new ForbiddenException(
        'You are not permitted to perform this action',
      );
    }
    return this.productRepo.delete({ id });
  }
}
