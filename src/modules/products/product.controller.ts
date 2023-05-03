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
import { ShopJwtGuard } from 'src/modules/shop-auth/guards/jwt-auth.guard';
import { CreateProductDto } from './dto/productDto';
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

  @UseGuards(ShopJwtGuard)
  @Post()
  async createProduct(
    @Request() req,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.createProduct(req.user.id, createProductDto);
  }

  @UseGuards(ShopJwtGuard)
  @Patch(':productId')
  async updateProduct(
    @Request() req,
    @Param('productId') productId: string,
    @Body() updateProductDto: Partial<CreateProductDto>,
  ) {
    return this.productService.updateProduct(
      req.user,
      productId,
      updateProductDto,
    );
  }

  @UseGuards(ShopJwtGuard)
  @Delete(':productId')
  async deleteProduct(@Request() req, @Param('productId') productId: string) {
    return this.productService.deleteProduct(req.user, productId);
  }
}
