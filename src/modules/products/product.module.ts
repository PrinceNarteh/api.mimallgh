import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ShopModule } from 'src/modules/shops/shop.module';

@Module({
  imports: [ShopModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
