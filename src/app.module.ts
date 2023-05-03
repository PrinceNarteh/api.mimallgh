import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfigAsync } from 'src/config/typeorm.config';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { ProductModule } from './product/product.module';
import { ShopAuthModule } from './shop-auth/shop-auth.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { PrismaService } from './modules/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync(typeOrmConfigAsync),
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
