import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalShopAuthGuard } from 'src/shop-auth/guards/local-auth.guard';
import { CreateProductDto, UpdateProductDto } from './dto/productDto';
import { ProductService } from './product.service';

@Controller('products')
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

  @UseGuards(LocalShopAuthGuard)
  @Post()
  async createProduct(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(req.user, createProductDto);
  }

  @UseGuards(LocalShopAuthGuard)
  @Patch(':productId')
  async updateProduct(
    @Request() req,
    @Param('productId') productId: string,
    @Body() createProductDto: UpdateProductDto,
  ) {
    return this.productService.updateProduct(
      req.user,
      productId,
      createProductDto,
    );
  }

  @UseGuards(LocalShopAuthGuard)
  @Delete(':productId')
  async deleteProduct(@Param('productId') productId: string) {
    return this.productService.deleteProduct(productId);
  }
}
