import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/productDto';
import { mapStringToCategory } from 'src/utils/mapper';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async allProducts() {
    return this.productService.products({});
  }

  @Get(':productId')
  async getProduct(@Param('productId') productId: string) {
    return this.productService.product({ id: productId });
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = {
      ...createProductDto,
      category: mapStringToCategory[createProductDto.category],
    };
    return this.productService.createProduct(product);
  }
}
