import { Body, Controller, Post, Get, Param } from '@nestjs/common';
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
  async getProduct(
    @Param('productId') productId: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const data = {
      ...updateProductDto,
      category: mapStringToCategory[updateProductDto.category],
    };
    return this.productService.updateProduct({
      where: { id: productId },
      data,
    });
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
