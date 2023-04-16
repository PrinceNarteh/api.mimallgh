import { Injectable } from '@nestjs/common';
import { Repository, FindManyOptions } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDto, UpdateProductDto } from './dto/productDto';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async product(id: string): Promise<Product | null> {
    return this.productRepository.findOne({ where: { id } });
  }

  async products(params: FindManyOptions<Product>): Promise<Product[]> {
    const { skip, take, where, order, select } = params;
    return this.productRepository.find({
      skip,
      take,
      where,
      order,
      select,
    });
  }

  async createProduct(data: CreateProductDto): Promise<Product> {
    return this.productRepository.create(data);
  }

  async updateProduct(id: string, data: UpdateProductDto): Promise<Product> {
    return this.productRepository.update({ id: id }, { ...data });
  }

  async deleteProduct(id: string): Promise<Product> {
    return this.productRepository.delete({ id });
  }
}
