import { Injectable } from '@nestjs/common';
import { Prisma, Product } from '@prisma/client';
import { CreateProductDto, IProductInput } from './dto/productDto';

@Injectable()
export class ProductService {
  constructor(private readonly : ) {}

  async product(
    
  ): Promise<Product | null> {
    return 
  }

  async products(params: IProductInput): Promise<Product[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.product.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createProduct(data: Prisma.ProductCreateManyInput): Promise<Product> {
    return this.prisma.product.create({
      data,
    });
  }

  async updateProduct(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: CreateProductDto;
  }): Promise<Product> {
    const { where, data } = params;
    return this.prisma.product.update({
      where,
      data: {
        ...data,
        images: {
          deleteMany: {
            productId: where.id,
          },
          createMany: {
            data: data.images,
          },
        },
      },
    });
  }

  async deleteProduct(where: Prisma.ProductWhereUniqueInput): Promise<Product> {
    return this.prisma.product.delete({
      where,
    });
  }
}
