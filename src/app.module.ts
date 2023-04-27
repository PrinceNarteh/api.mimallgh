import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from 'ormconfig';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { ShopAuthModule } from './shop-auth/shop-auth.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ProductModule,
    ShopModule,
    TypeOrmModule.forRoot(config),
    ShopAuthModule,
    OrdersModule,
  ],
})
export class AppModule {}
