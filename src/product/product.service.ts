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
    const product = await this.productRepo.findOne({
      where: { id },
      relations: {
        images: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
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

  async updateProduct(
    shopId: string,
    productId: string,
    data: UpdateProductDto,
  ) {
    const shop = await this.shopRepo.findOne({
      where: { id: shopId },
      relations: {
        products: true,
      },
    });
    if (!shop) {
      throw new NotFoundException('Shop not found');
    }

    const product = await this.productRepo.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (shop.id !== data.shopId.id) {
      throw new ForbiddenException(
        'You are not permitted to perform this action',
      );
    }

    for (let image of product.images) {
      await this.productImgRepo.delete(image.id);
    }

    const { images } = data;
    const imageArr = [];

    for (let image of images) {
      const res = this.productImgRepo.create(image);
      await this.productImgRepo.save(res);
      imageArr.push(res);
    }

    const newData = {
      ...data,
      images: imageArr,
    };

    await this.productRepo.update({ id: productId }, { ...newData });

    return product;
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
