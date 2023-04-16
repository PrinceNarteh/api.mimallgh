import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto/productDto';
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
    return this.productService.product(productId);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const product = {
      ...createProductDto,
      category: mapStringToCategory[createProductDto.category],
    };
    return this.productService.createProduct(product);
  }

  @Patch(':productId')
  async updateProduct(
    @Param('productId') productId: string,
    @Body() createProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(productId, createProductDto);
  }

  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
