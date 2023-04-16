import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { ShopModule } from './shop/shop.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'src/config/ormconfig';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ShopModule,
    TypeOrmModule.forRoot(config),
  ],
})
export class AppModule {}
