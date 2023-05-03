import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { OrdersModule } from './modules/orders/orders.module';
import { ProductModule } from './modules/products/product.module';
import { ShopAuthModule } from './modules/shop-auth/shop-auth.module';
import { ShopModule } from './modules/shops/shop.module';
import { UserModule } from './modules/users/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    UserModule,
    ProductModule,
    ShopModule,
    ShopAuthModule,
    OrdersModule,
    PrismaModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
