import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductImage } from 'src/entities/productImage.entity';
import { Shop } from 'src/entities/shop.entity';
import { ShopModule } from 'src/shop/shop.module';
import { Product } from '../entities/product.entity';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, ProductImage, Shop]),
    ShopModule,
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
