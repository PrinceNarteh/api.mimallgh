import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto/productDto';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  async product(id: string): Promise<Product | null> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async products(params: FindManyOptions<Product>) {
    const { skip, take, where, order, select, relations } = params;
    return this.productRepo.find({
      skip,
      take,
      where,
      order,
      select,
      relations,
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

    shop.products.push(product);

    await this.shopRepo.save(shop);

    return product;
  }

  async updateProduct(
    shop: { id: string; shopCode: string },
    productId: string,
    data: UpdateProductDto,
  ) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: {
        images: true,
        shop: true,
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.shop.id !== shop.id) {
      throw new ForbiddenException(
        'You are not permitted to perform this action',
      );
    }

    for (let image of product.images) {
      await this.productImgRepo.delete(image.id);
    }

    const { images } = data;
    const imageArr: ProductImage[] = [];

    for (let image of images) {
      const res = this.productImgRepo.create(image);
      await this.productImgRepo.save(res);
      imageArr.push(res);
    }

    const newData = {
      ...data,
      images: imageArr,
    };

    const instance = await this.productRepo.findOne({
      where: { id: productId },
      relations: {
        images: true,
      },
    });

    Object.assign(instance, newData);
    instance.save();

    return instance;
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
