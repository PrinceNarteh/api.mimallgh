import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ShopService } from 'src/shop/shop.service';
import { CreateProductDto, UpdateProductDto } from './dto/productDto';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService, // private readonly shopService: ShopService,
  ) {}

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
    // const shop = await this.shopService.shop('');

    // if (!shop) {
    //   return new NotFoundException('Shop not found');
    // }

    console.log(createProductDto);

    const data = {
      ...createProductDto,
      // shop,
    };

    return createProductDto;
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
