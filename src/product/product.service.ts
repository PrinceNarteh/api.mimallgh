import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductImage } from 'src/entities/productImage.entity';
import { Shop } from 'src/entities/shop.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from '../entities/product.entity';
import { CreateProductDto, UpdateProductDto } from './dto/productDto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepo: Repository<Shop>,
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

  async createProduct(shopId: string, data: CreateProductDto) {
    const shop = await this.shopRepo.findOne({
      where: { id: shopId },
      relations: {
        products: true,
      },
    });
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    const { images } = data;
    const imageArr = [];

    for (let image of images) {
      const res = this.productImgRepo.create(image);
      await this.productImgRepo.save(res);
      imageArr.push(res);
    }

    const product = this.productRepo.create({
      ...data,
      images: imageArr,
    });

    await this.productRepo.save(product);

    shop.products = [...shop.products, product];

    await this.shopRepo.save(shop);

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
    if (product && shop.id !== product.shop.id) {
      throw new ForbiddenException(
        'You are not permitted to perform this action',
      );
    }
    return this.productRepo.delete({ id });
  }
}
